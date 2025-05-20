import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { HuespedService } from '../../Huesped/huesped.service';
import { HuespedRequest, HuespedResponse } from '../../Huesped/huesped.model';
import { RoomsService } from '../../Habitaciones/rooms.service';
import { TypesRoomsStatus } from '../../Habitaciones/rooms.model';
import { ActivatedRoute } from '@angular/router';

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
    CommonModule,
  ],
  templateUrl: './form-registro.component.html',
  styleUrl: './form-registro.component.css',
})
// export class FormRegistroComponent implements OnInit {
//   formulario!: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private huespedService: HuespedService,
//     private habitacionService: RoomsService
//   ) {
//     // this.formulario = this.fb.group({
//     //   nameHuesped: ['', Validators.required],
//     //   apellidoHuesped: ['', Validators.required],
//     //   telefono: ['', Validators.required],
//     //   numPersonas: [1, [Validators.required, Validators.min(1)]],
//     //   monto: [0, [Validators.required, Validators.min(0)]],
//     //   statusHuesped: ['', Validators.required],
//     //   fechaRegistro: [null, Validators.required],
//     //   fechaSalida: [null, Validators.required],
//     //   usuarioRegistrador: this.fb.group({
//     //     id_users: ['', Validators.required]
//     //   }),
//     //   habitacionAsignada: this.fb.group({
//     //     id_Rooms: ['', Validators.required]
//     //   })
//     // });
//   }

//   ngOnInit() {
//     this.setUserIdFromLocalStorage();
//     this.checkHuespedesActivosHoy();
//   }


//   onSubmit() {
//     if (this.formulario.valid) {
//       const huespedRequest: HuespedRequest = this.formulario.value;

//       this.huespedService.createHuesped(huespedRequest).subscribe({
//         next: (respuesta) => {
//           this.formulario.reset();
//         },

//         error: (error) => {
//           console.error('Error al crear huésped:', error);
//         },
//       });

//       this.habitacionService
//         .changeStatus(
//           huespedRequest.habitacionAsignada.id_Rooms,
//           TypesRoomsStatus.ocupada
//         )
//         .subscribe({
//           next: (respuesta) => {
//             console.log('Estado de habitación actualizado:', respuesta);
//           },
//         });
//     } else {
//       this.formulario.markAllAsTouched();
//     }
//   }

//   cancelar() {
//     this.formulario.reset();
//   }

//   private setUserIdFromLocalStorage() {
//     const idUser = localStorage.getItem('idUser');
//     if (idUser) {
//       this.formulario.get('usuarioRegistrador.id_users')?.setValue(idUser);
//     }
//   }


//     private initForm(data?: HuespedRequest) {
//     this.formulario = this.fb.group({
//       nameHuesped: [data?.nameHuesped || '', Validators.required],
//       apellidoHuesped: [data?.apellidoHuesped || '', Validators.required],
//       telefono: [data?.telefono || '', Validators.required],
//       numPersonas: [data?.numPersonas ?? 1, [Validators.required, Validators.min(1)]],
//       monto: [data?.monto ?? 0, [Validators.required, Validators.min(0)]],
//       statusHuesped: [data?.statusHuesped || '', Validators.required],
//       fechaRegistro: [data?.fechaRegistro || null, Validators.required],
//       fechaSalida: [data?.fechaSalida || null, Validators.required],
//       usuarioRegistrador: this.fb.group({
//         id_users: [data?.usuarioRegistrador?.id_users || '', Validators.required]
//       }),
//       habitacionAsignada: this.fb.group({
//         id_Rooms: [data?.habitacionAsignada?.id_Rooms || '', Validators.required]
//       })
//     });
//   }






//   private checkHuespedesActivosHoy() {
//     const hoy = new Date();
//     hoy.setHours(0, 0, 0, 0);

//     this.huespedService.getHuesped().subscribe((huespedes) => {
//       const huespedesHoy = huespedes.filter((h) => {
//         const fechaInicio = new Date(h.fechaRegistro);
//         const fechaFin = new Date(h.fechaSalida);
//         fechaInicio.setHours(0, 0, 0, 0);
//         fechaFin.setHours(0, 0, 0, 0);
//         return hoy >= fechaInicio && hoy <= fechaFin;
//       });

//       if (huespedesHoy.length > 0) {
//         console.log('Huéspedes activos hoy:', huespedesHoy);
//       } else {
//         console.log('No hay huéspedes registrados para hoy.');
//       }
//     });
//   }
// }

export class FormRegistroComponent implements OnInit {
  formulario!: FormGroup;
  idRoomFromRoute!: number;

  constructor(
    private fb: FormBuilder,
    private huespedService: HuespedService,
    private habitacionService: RoomsService,
    private route: ActivatedRoute

  ) {}

  ngOnInit() {
     this.idRoomFromRoute = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.setUserIdFromLocalStorage();
    this.autollenarSiHuespedActivo();
  }

  private initForm(data?: HuespedResponse) {
    this.formulario = this.fb.group({
      idHuesped: [data?.idHuesped ],
      nameHuesped: [data?.nameHuesped || '', Validators.required],
      apellidoHuesped: [data?.apellidoHuesped || '', Validators.required],
      telefono: [data?.telefono || '', Validators.required],
      numPersonas: [data?.numPersonas ?? 1, [Validators.required, Validators.min(1)]],
      monto: [data?.monto ?? 0, [Validators.required, Validators.min(0)]],
      statusHuesped: [data?.statusHuesped || '', Validators.required],
      fechaRegistro: [data?.fechaRegistro || null, Validators.required],
      fechaSalida: [data?.fechaSalida || null, Validators.required],
      usuarioRegistrador: this.fb.group({
        id_users: [data?.usuarioRegistrador?.id_users || '', Validators.required]
      }),
      habitacionAsignada: this.fb.group({
        id_Rooms: [data?.habitacionAsignada?.id_Rooms || '', Validators.required]
      })
    });
  }

  private setUserIdFromLocalStorage() {
    const idUser = localStorage.getItem('idUser');
    if (idUser) {
      this.formulario.get('usuarioRegistrador.id_users')?.setValue(idUser);
      this.formulario.get('habitacionAsignada.id_Rooms')?.setValue(this.idRoomFromRoute)
      

    }
  }

 private autollenarSiHuespedActivo() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    this.huespedService.getHuesped().subscribe((huespedes) => {
      const huespedActivo = huespedes.find(h => {
        const inicio = new Date(h.fechaRegistro);
        const fin = new Date(h.fechaSalida);
        inicio.setHours(0, 0, 0, 0);
        fin.setHours(0, 0, 0, 0);
        return (
          hoy >= inicio &&
          hoy <= fin &&
          h.habitacionAsignada?.id_Rooms === this.idRoomFromRoute
        );
      });

      if (huespedActivo) {
        
        this.formulario.patchValue(huespedActivo);
      } else {
       
     
      }
    });
  }

  onSubmit() {
  if (this.formulario.valid) {
    const huespedRequest = this.formulario.value;
    const idHuesped = this.formulario.get('idHuesped')?.value;

    if (idHuesped) {
      this.huespedService.updateHuesped(idHuesped, huespedRequest).subscribe({
        next: () => {
          console.log('Huésped actualizado correctamente');
          this.formulario.reset();
        },
        error: (err) => console.error('Error al actualizar huésped:', err)
      });
    } else {
      this.huespedService.createHuesped(huespedRequest).subscribe({
        next: () => {
          console.log('Huésped creado correctamente');
          this.formulario.reset();
        },
        error: (err) => console.error('Error al crear huésped:', err)
      });

      this.habitacionService.changeStatus(
        huespedRequest.habitacionAsignada.id_Rooms,
        TypesRoomsStatus.ocupada
      ).subscribe({
        next: (res) => console.log('Estado de habitación actualizado:', res)
      });
    }
  } else {
    this.formulario.markAllAsTouched();
  }
}

  cancelar() {
    this.formulario.reset();
  }
}
