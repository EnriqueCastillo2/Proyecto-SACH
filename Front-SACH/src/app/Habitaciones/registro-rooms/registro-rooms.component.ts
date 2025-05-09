import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Room, TypesRooms, TypesRoomsLevel, TypesRoomsStatus } from '../rooms.model';
import { RoomsService } from '../rooms.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro-rooms',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,],
  templateUrl: './registro-rooms.component.html',
  styleUrl: './registro-rooms.component.css'
})
export class RegistroRoomsComponent implements OnInit {
  roomForm!: FormGroup;

  typesRooms = Object.values(TypesRooms);
  typesRoomsLevel = Object.values(TypesRoomsLevel);
  typesRoomsStatus = Object.values(TypesRoomsStatus);

  constructor(
    private fb: FormBuilder,
    private roomsService: RoomsService,
    private dialogRef: MatDialogRef<RegistroRoomsComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: Room | null
  ) {}

  ngOnInit(): void {
    this.roomForm = this.fb.group({
      id_Rooms: [this.data?.id_Rooms || '', Validators.required],
      habitacion: [this.data?.habitacion || '', Validators.required],
      nivel: [this.data?.nivel || '', Validators.required],
      estado: [this.data?.estado || '', Validators.required],
      precio: [
        this.data?.precio || '',
        [Validators.required, Validators.min(0)],
      ]
    });

    
  }

 

  onSubmit() {
    if (this.roomForm.valid) {
      const room = this.roomForm.value;
      

      if (this.data) {
        this.roomsService.updateRoom(this.data.id_Rooms, room).subscribe({
          next: () => {
            this.snackBar.open('Habitación actualizada con éxito', 'Cerrar', {
              duration: 3000,
            });
            this.dialogRef.close('actualizado');
          },
          error: (error) => {
            console.error('Error al actualizar la habitación:', error);
            this.snackBar.open('Error al actualizar la habitación', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      } else {
        
        this.roomsService.createRoom(room).subscribe({
          next: () => {
            this.snackBar.open('Habitación registrada con éxito', 'Cerrar', {
              duration: 3000,
            });
            this.dialogRef.close('creado');
          },
          error: (error) => {
            console.error('Error al registrar la habitación:', error);
            this.snackBar.open('Error al registrar la habitación', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      }
    } else {
      this.snackBar.open('Por favor completa todos los campos', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  cancelar() {
    this.roomForm.reset();
   
    this.dialogRef.close();
  }
}
