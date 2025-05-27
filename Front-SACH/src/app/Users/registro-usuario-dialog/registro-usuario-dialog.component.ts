import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../Users.service';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../user.model';

@Component({
  selector: 'app-registro-usuario-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './registro-usuario-dialog.component.html',
  styleUrl: './registro-usuario-dialog.component.css',
})
export class RegistroUsuarioDialogComponent implements OnInit {
  registroForm!: FormGroup;
  imagenPreview: string | null = null;
  formInvalido=false;
  errorPasswordBack:string='';

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private dialogRef: MatDialogRef<RegistroUsuarioDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: User | null
  ) {}

  typeUserOptions = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Usuario', value: 'user' },
  ];

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      apellido: [this.data?.apellido || '', Validators.required],
      password: [ this.data?.password || '',  [Validators.required, Validators.minLength(8)],],
      typeUser: [this.data?.typeUser || '', Validators.required],
      imagenBase64: [this.data?.imagenBase64 || ''],
    });

    this.imagenPreview = this.generarPreviewImagen(this.data?.imagenBase64 || null);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      this.imagenPreview = result;

      const base64Puro = result.split(',')[1];

      this.registroForm.get('imagenBase64')?.setValue(base64Puro);
    };

    reader.readAsDataURL(file);
  }

  procesarImagen(imagen: string): string {
    if (imagen.startsWith('http') || imagen.startsWith('/uploads/')) {
      return imagen.split('/').pop() || '';
    }
    return imagen;
  }

  onSubmit() {
    this.formInvalido=false;
    this.errorPasswordBack='';
     
    if (this.registroForm.valid) {
      const usuario = this.registroForm.value;
      

      if (this.data) {
       
        usuario.imagenBase64 = this.procesarImagen(usuario.imagenBase64);

        this.usersService.updateUser(this.data.id_users, usuario).subscribe({
          next: () => {
            this.snackBar.open('Usuario actualizado con éxito', 'Cerrar', {
              duration: 3000,
            });
            this.dialogRef.close('actualizado');
              
          },
          error: (error) => {
          
            const mensajeError = error.error?.message || '';
          if (mensajeError.toLowerCase().includes('contraseña')) {
            this.errorPasswordBack = mensajeError;
          } else {
            this.snackBar.open('Error al actualizar el usuario', 'Cerrar', { duration: 3000 });
          }
          },
        });
      } else {
        this.usersService.createUser(usuario).subscribe({
          next: () => {
            this.snackBar.open('Usuario registrado con éxito', 'Cerrar', {
              duration: 3000,
            });
            this.dialogRef.close('creado');
          },
          error: (error) => {
             console.error('Error al registrar el usuario:', error);
          const mensajeError = error.error?.message || '';
          if (mensajeError.toLowerCase().includes('contraseña')) {
            this.errorPasswordBack = mensajeError;
          } else {
            this.snackBar.open('Error al registrar el usuario', 'Cerrar', { duration: 3000 });
          }
        },
      });
    }
    } else {
       this.formInvalido = true;
    this.registroForm.markAllAsTouched();
    }
  }

  cancelar() {
    this.registroForm.reset();
    this.imagenPreview = null;
    this.dialogRef.close();
  }
  
  private generarPreviewImagen(imagen: string | null): string | null {
  if (!imagen) return null;

  // Si es una URL relativa o absoluta, le agregamos un parámetro para evitar caché
  if (imagen.startsWith('http') || imagen.startsWith('/uploads/')) {
    return `${imagen}?t=${Date.now()}`;
  }

  // Si es base64, la mostramos directamente
  return `data:image/png;base64,${imagen}`;
}
}
