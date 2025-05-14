import { Component, Input } from '@angular/core';
import { Room } from '../../rooms.model';
import { CommonModule } from '@angular/common';
import { RoomsService } from '../../rooms.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomsComponent } from '../rooms.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-roomcard',
  imports: [CommonModule,RouterLink],
  templateUrl: './roomcard.component.html',
  styleUrl: './roomcard.component.css'
})
export class RoomcardComponent {

  constructor(private roomService:RoomsService,
    private snackBar: MatSnackBar,
    private roomComponent: RoomsComponent,
  ) { }



  @Input() room!: Room;

  getEstadoUppercase(estado: string): string {
    return estado.toUpperCase();
  }

  getClaseEstado(estado: string): string {
    const estadoLower = estado.toLowerCase();
    switch (estadoLower) {
      case 'ocupada': return 'OCUPADA';
      case 'libre': return 'LIBRE';
      case 'limpieza': return 'LIMPIEZA';
      default: return '';
    }
  }

  getTipoHabitacion(tipo: string): string {
    const tipoLower = tipo.toLowerCase();
    switch (tipoLower) {
      case 'normal': return 'Habitación_Normal';
      case 'doble': return 'Habitación_Doble';
      case 'plus': return 'Habitación_Plus';
      default: return tipo;
    }
  }

  // getClaseBadge(estado: string): string {
  //   return this.getClaseEstado(estado);
  // }

 editarHabitacion() {
  this.roomComponent.abrirFormularioRooms(this.room);

} 
  
eliminarHabitacion(id: number) {
  this.roomService.deleteRoom(id).subscribe(() => {
    this.snackBar.open('Habitacion eliminada con éxito', 'Cerrar', {
      duration: 3000,
    });
  });
  
}
}