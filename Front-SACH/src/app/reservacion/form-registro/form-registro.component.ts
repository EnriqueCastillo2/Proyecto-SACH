import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { HuespedService } from '../../Huesped/huesped.service';
import { HuespedRequest } from '../../Huesped/huesped.model';
import { RoomsService } from '../../Habitaciones/rooms.service';
import { TypesRoomsStatus } from '../../Habitaciones/rooms.model';

@Component({
  selector: 'app-form-registro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule
  ],
  templateUrl: './form-registro.component.html',
  styleUrl: './form-registro.component.css'
})
export class FormRegistroComponent {

  formulario: FormGroup;

  constructor(private fb: FormBuilder, 
    private huespedService: HuespedService,
    private habitacionService: RoomsService
  ) {
    this.formulario = this.fb.group({
      nameHuesped: ['', Validators.required],
      apellidoHuesped: ['', Validators.required],
      telefono: ['', Validators.required],
      numPersonas: [1, [Validators.required, Validators.min(1)]],
      monto: [0, [Validators.required, Validators.min(0)]],
      statusHuesped: ['', Validators.required],
      fechaRegistro: [null, Validators.required],
      fechaSalida: [null, Validators.required],
      
      usuarioRegistrador: this.fb.group({
        id_users: ['', Validators.required]
      }),
      habitacionAsignada: this.fb.group({
        id_Rooms: ['', Validators.required]
      })
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      const huespedRequest: HuespedRequest = this.formulario.value;

      this.huespedService.createHuesped(huespedRequest).subscribe({
        next: (respuesta) => {
          console.log('Huésped creado exitosamente:', respuesta);
          // Aquí podrías redirigir, limpiar el formulario o mostrar un mensaje
          this.formulario.reset();
        },
        
        error: (error) => {
          console.error('Error al crear huésped:', error);
        }
      });

      this.habitacionService.changeStatus(huespedRequest.habitacionAsignada.id_Rooms,TypesRoomsStatus.ocupada).subscribe({
        next: (respuesta) => {

          console.log('Estado de habitación actualizado:', respuesta);
        }
      });
    } else {
      this.formulario.markAllAsTouched();
    }
  }
}
