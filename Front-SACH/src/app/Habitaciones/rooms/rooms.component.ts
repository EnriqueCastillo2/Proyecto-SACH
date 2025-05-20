import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../rooms.service';
import { Room, TypesRooms, TypesRoomsStatus } from '../rooms.model';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { RoomcardComponent } from './roomcard/roomcard.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { RegistroRoomsComponent } from '../registro-rooms/registro-rooms.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, RoomcardComponent, MatProgressSpinnerModule,FormsModule,RouterLink],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
admin: any;
datosHabitacion() {
console.log(this.rooms);
}


  isLoading: boolean = false;
  rooms: Room[] = [];
  customMessage: string = '';
  idBusqueda:number|null = null; 

  constructor(
    private roomsService: RoomsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargarHabitaciones(); 
    this.isAdmin();
  }

  isAdmin() {
  const localrol=localStorage.getItem('rol');
  if(localrol=='admin'){
  this.admin=true;
  }
 }
  getClaseEstado(estado: TypesRoomsStatus): string {
    return `estado-${estado}`;
  }

  getTipoHabitacion(tipo: TypesRooms): string {
    switch (tipo) {
      case 'normal':return 'Habitación Normal';
      case 'doble':return 'Habitación Doble';
      case 'plus':return 'Habitación Plus';
      default: return tipo;
    }
  }

  cargarHabitaciones() {
    this.roomsService.getRooms().subscribe({
      next: (rooms) => {
        this.rooms = rooms;
      },
      error: (err: HttpErrorResponse) => {
        this.customMessage =
          err.error?.message || 'Error al cargar habitaciones';
      },
    });
  }

  abrirFormularioRooms(room: Room | null) {
    const dialogRef = this.dialog.open(RegistroRoomsComponent, {
      data: room,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'creado' || result === 'actualizado') {
        this.isLoading = true;
      
          this.cargarHabitaciones();
          this.isLoading = false;
          const message =
            result === 'creado'
              ? 'Habitacion creada con éxito'
              : 'Habitacion actualizada con éxito';
          this.snackBar.open(message, 'Cerrar', {
            duration: 3000,
          });
        
      }
    });
  }

  buscarHabitacionPorId() {
    if (this.idBusqueda == null) {
      this.snackBar.open('Por favor ingresa un ID para buscar.', 'Cerrar', { duration: 3000 });
      return;
    }
  
    this.isLoading = true;
    this.roomsService.getRoomById(this.idBusqueda).subscribe({
      next: (room) => {
        this.rooms = [room]; // Mostramos solo esa habitación encontrada
        this.isLoading = false;
        this.customMessage = '';
      },
      error: (err: HttpErrorResponse) => {
        this.rooms = [];
        this.isLoading = false;
        this.customMessage = err.error?.message || 'Habitación no encontrada';
      },
    });
  }
  filtrarPorNivel(nivel: string) {
    this.isLoading = true;
    this.roomsService.getRooms().subscribe({
      next: (rooms) => {
        // Filtramos las habitaciones que tengan el nivel deseado
        this.rooms = rooms.filter(room => room.nivel === nivel);
        this.isLoading = false;
        if (this.rooms.length === 0) {
          this.customMessage = `No se encontraron habitaciones en el Nivel ${nivel}.`;
        } else {
          this.customMessage = '';
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading = false;
        this.customMessage = err.error?.message || 'Error al cargar habitaciones';
      }
    });
  }
  
}
