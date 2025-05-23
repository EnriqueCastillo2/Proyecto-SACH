import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../Users/Users.service';
import { User } from '../Users/user.model';
import { FormRegistroComponent } from "./form-registro/form-registro.component";
import { CommonModule } from '@angular/common';
import { RoomsService } from '../Habitaciones/rooms.service';
import { Room, TypesRoomsStatus } from '../Habitaciones/rooms.model';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-reservacion',
  imports: [FormRegistroComponent,CommonModule,
    MatFormFieldModule,MatSelectModule,FormsModule,RouterLink
  ],
  templateUrl: './reservacion.component.html',
  styleUrl: './reservacion.component.css'
})
export class ReservacionComponent {
  mensaje: string='';

estadoSeleccionado: string = '';

estadossDisponibles: string[] = ['libre', 'ocupada', 'limpieza'];
   IdlocalStorage = localStorage.getItem('idUser');
   Idparamroute: string | null = null;
   user!: User;
   room: Room={} as Room;
   
  estadosDisponibles: TypesRoomsStatus[] = [
    TypesRoomsStatus.libre,
    TypesRoomsStatus.ocupada,
    TypesRoomsStatus.limpieza
  ];



  urlImg="http://localhost:8080/uploads/"

  constructor(private userService:UsersService,
              private roomService:RoomsService,
              private route : ActivatedRoute,
  ) { }
 
  ngOnInit() {
   
    this.Idparamroute= this.route.snapshot.paramMap.get('id');

    

    
    if (this.Idparamroute !== null) {
      const roomId = Number(this.Idparamroute);
      if (!isNaN(roomId)) {
        this.getRoomById(roomId);
        this.cargarMensajePorHabitacion(roomId);
      }
    }
  }

 cambiarEstado(event: Event) {
  const target = event.target as HTMLSelectElement | null;
  if (!target || !this.room?.id_Rooms) return;

  const nuevoEstado = target.value as TypesRoomsStatus;
  this.estadoSeleccionado = nuevoEstado;

  this.roomService.changeStatus(this.room.id_Rooms, nuevoEstado).subscribe({
    next: () => {
      this.room.estado = nuevoEstado;
      console.log(`Estado actualizado a ${nuevoEstado}`);
    },
    error: () => {
      console.error('Error al cambiar el estado de la habitación');
    }
  });
}
 
onIdUsuarioRegistrador(idUser: string) {
    this.getUserById(idUser);
  }

  getUserById(id: string) {
    this.userService.getUserbyId(id).subscribe(
      (response) => { 
        this.user = response;
      });  

}
 getRoomById(id: number){
    this.roomService.getRoomById(id).subscribe(
      (response) => {
        this.room = response;
        this.estadoSeleccionado=response.estado;

      });
  }

cargarMensajePorHabitacion(idHabitacion: number) {
  const clave = `mensajeHabitacion_${idHabitacion}`;
  const mensajeGuardado = localStorage.getItem(clave);
   if (mensajeGuardado) {
    this.mensaje = mensajeGuardado;
  } else {
    this.mensaje = '';
  }
}

guardarMensajePorHabitacion() {
  if (!this.room?.id_Rooms) return;

  const clave = `mensajeHabitacion_${this.room.id_Rooms}`;
  const contenido = this.mensaje.trimStart();
  if (!contenido || contenido.trim().length === 0) {
    this.borrarMensajePorHabitacion();
    return;
  }
  localStorage.setItem(clave, contenido);
  this.mensaje=contenido;

}

borrarMensajePorHabitacion() {
  if (!this.room?.id_Rooms) return;
  const clave = `mensajeHabitacion_${this.room.id_Rooms}`;
  localStorage.removeItem(clave);
  this.mensaje = '';
}

}
