import { Component } from '@angular/core';
import { HuespedService } from '../Huesped/huesped.service';
import { HuespedResponse } from '../Huesped/huesped.model';
import { UsersService } from '../Users/Users.service';
import { User } from '../Users/user.model';
import { FormRegistroComponent } from "./form-registro/form-registro.component";
import { CommonModule } from '@angular/common';
import { RoomsService } from '../Habitaciones/rooms.service';
import { Room } from '../Habitaciones/rooms.model';

@Component({
  selector: 'app-reservacion',
  imports: [FormRegistroComponent,CommonModule],
  templateUrl: './reservacion.component.html',
  styleUrl: './reservacion.component.css'
})
export class ReservacionComponent {



   user!: User;
   room!: Room;
   urlImg="http://localhost:8080/uploads/"

  constructor(private userService:UsersService,
              private roomService:RoomsService,
  ) { }

  ngOnInit() {
    this.getUserById("JF0018")
    this.getRoomById(101);
  }

  getUserById(id: string) {
    this.userService.getUserbyId(id).subscribe(
      (response) => { 
        this.user = response;
        console.log(this.user);
      });  

}
 getRoomById(id: number){
    this.roomService.getRoomById(id).subscribe(
      (response) => {
        this.room = response;
        console.log(this.room);

        
      });
  }


}
