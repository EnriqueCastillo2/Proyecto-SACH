import { Component } from '@angular/core';
import { HuespedService } from '../Huesped/huesped.service';
import { HuespedResponse } from '../Huesped/huesped.model';
import { UsersService } from '../Users/Users.service';
import { User } from '../Users/user.model';
import { FormRegistroComponent } from "./form-registro/form-registro.component";
import { CommonModule } from '@angular/common';
import { RoomsService } from '../Habitaciones/rooms.service';
import { Room } from '../Habitaciones/rooms.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservacion',
  imports: [FormRegistroComponent,CommonModule],
  templateUrl: './reservacion.component.html',
  styleUrl: './reservacion.component.css'
})
export class ReservacionComponent {

   IdlocalStorage = localStorage.getItem('idUser');
   Idparamroute: string | null = null;
   user!: User;
   room!: Room;
urlImg="http://localhost:8080/uploads/"

  constructor(private userService:UsersService,
              private roomService:RoomsService,
              private route : ActivatedRoute,
  ) { }
 
  ngOnInit() {
    this.IdlocalStorage = localStorage.getItem('idUser');
    this.Idparamroute= this.route.snapshot.paramMap.get('id');


    this.getUserById(this.IdlocalStorage!);
    
    if (this.Idparamroute !== null) {
      const roomId = Number(this.Idparamroute);
      if (!isNaN(roomId)) {
        this.getRoomById(roomId);
      }
    }
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

      });
  }


}
