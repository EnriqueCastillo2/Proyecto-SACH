
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { HuespedResponse } from '../huesped.model';
import { HuespedService } from '../huesped.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-huesped',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './huesped.component.html',
  styleUrls: ['./huesped.component.css']
})
export class HuespedComponent implements OnInit {

  huespedResponse: HuespedResponse[] = [];
  huespedResponseFiltrados: HuespedResponse[] = [];
  filtroId: string = '';
  filtroFechaInicio: Date | null = null;
  filtroFechaFin: Date | null = null;

  constructor(
    private huespedService: HuespedService,
    private router:Router,
    private snackBar: MatSnackBar,
 
  ) {}

  ngOnInit() {

    this.huespedService.loadHuespedes();

    
    this.huespedService.getHuespedes().subscribe(huespedes => {
      this.huespedResponse = huespedes;
      this.aplicarFiltros(); 
    });
  }

  esIdValido(): boolean {
    return this.filtroId?.length === 3 && /^\d+$/.test(this.filtroId);
  }

  aplicarFiltros() {
    this.huespedResponseFiltrados = this.huespedResponse.filter((huesped) => {
      let coincideHabitacion = true;
      if (this.filtroId && this.esIdValido()) {
        coincideHabitacion = huesped.habitacionAsignada.id_Rooms.toString() === this.filtroId;
      } else if (this.filtroId && !this.esIdValido()) {
        return false;
      }

      let coincideFecha = true;
      if (this.filtroFechaInicio && this.filtroFechaFin) {
        const fechaRegistro = new Date(huesped.fechaRegistro);
        coincideFecha = fechaRegistro >= this.filtroFechaInicio &&
                        fechaRegistro <= this.filtroFechaFin;
      }

      return coincideHabitacion && coincideFecha;
    });
  }

  limpiarFiltros() {
    this.filtroId = '';
    this.filtroFechaInicio = null;
    this.filtroFechaFin = null;
    this.aplicarFiltros();
  }

  editarHuesped(huesped: HuespedResponse,id:number) {
      this.huespedService.setHuespedAEditar(huesped);
  this.router.navigate(['/SACH/RegistroHuesped',id])  
}

  delete(id: string) {
    this.huespedService.deleteHuesped(id).subscribe(() => {
      this.snackBar.open('Huésped eliminado con éxito', 'Cerrar', {
        duration: 3000,
      });
      // No hace falta volver a llamar a loadHuespedes porque ya lo hace el service
    });
  }
}
