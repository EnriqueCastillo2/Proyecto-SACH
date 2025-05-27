import { Component, OnInit, output, signal } from '@angular/core';
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
import { HuespedResponse } from '../../Huesped/huesped.model';
import { RoomsService } from '../../Habitaciones/rooms.service';
import { TypesRoomsStatus } from '../../Habitaciones/rooms.model';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';


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


export class FormRegistroComponent implements OnInit {
  formulario!: FormGroup;
  idRoomFromRoute!: number;
  readonly idUsuarioRegistrador = output<string>();


  constructor(
    private fb: FormBuilder,
    private huespedService: HuespedService,
    private habitacionService: RoomsService,
    private route: ActivatedRoute,
    

  ) {}

  ngOnInit() {

     this.idRoomFromRoute = Number(this.route.snapshot.paramMap.get('id'));
   
    this.initForm();

    this.setUserIdFromLocalStorage();


     this.huespedService.huespedAEditar$.pipe(take(1)).subscribe(huesped => {
    if (huesped) {
      this.initForm(huesped);
    } else {
      this.autollenarSiHuespedActivo();
     
    }

    
  });

  }

  private initForm(data?: HuespedResponse) {
    this.formulario = this.fb.group({
      idHuesped: [data?.idHuesped ],
      nameHuesped: [data?.nameHuesped || '', Validators.required],
      apellidoHuesped: [data?.apellidoHuesped || '', Validators.required],
      telefono: [data?.telefono || '',[Validators.required,Validators.pattern(/^\d{10}$/),
    Validators.maxLength(8),] ],
      numPersonas: [data?.numPersonas ?? 1, [Validators.required, Validators.min(1)]],
      monto: [data?.monto ??  [Validators.required, Validators.min(1)]],
      statusHuesped: [data?.statusHuesped || 'Soltero(a)', [
    Validators.required,
    Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
  ]],
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

    this.huespedService.getHuespedes().subscribe((huespedes) => {
      
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
      const idUser = huespedActivo.usuarioRegistrador?.id_users;
      if (idUser) {
        this.idUsuarioRegistrador.emit(idUser); // ✅ Emitimos con output() signal
      }
    }
    });
  }


  cancelar() {
    this.formulario.reset();
     this.huespedService.clearHuespedAEditar();
     
  }
  



onSubmit() {
  if (this.formulario.valid) {
    const huespedRequest = this.formulario.value;
    const idHuesped = this.formulario.get('idHuesped')?.value;

    const fechaRegistro = new Date(huespedRequest.fechaRegistro);
    const hoy = new Date();
    fechaRegistro.setHours(0, 0, 0, 0);
    hoy.setHours(0, 0, 0, 0);


    const cambiarEstadoSiEsHoy = () => {
      if (fechaRegistro.getTime() === hoy.getTime()) {
        this.habitacionService.changeStatus(
          huespedRequest.habitacionAsignada.id_Rooms,
          TypesRoomsStatus.ocupada
        ).subscribe({
          
          error: () => confirm('Error al actualizar habitación:')
        });
      }
    };

    const onSuccess = (msg: string) => {
      confirm(msg);
      cambiarEstadoSiEsHoy();
      this.formulario.reset();
      this.huespedService.clearHuespedAEditar();
    };

    if (idHuesped) {
      this.huespedService.updateHuesped(idHuesped, huespedRequest).subscribe({
        next: () => onSuccess('Huésped actualizado con éxito'),
        error: (err) => console.error('Error al actualizar huésped:', err)
      });
    } else {
      this.huespedService.createHuesped(huespedRequest).subscribe({
        next: () => onSuccess('Huésped registrado con éxito'),
        error: () => confirm('Error al registrar el huésped')
      });
    }
  } else {
    this.formulario.markAllAsTouched();
  }
}

}

