import { Room } from "../Habitaciones/rooms.model";
import { User } from "../Users/user.model";

export interface Huesped {
    nameHuesped: string;
    apellidoHuesped: string;
    telefono: string;
    numPersonas: number;
    monto: number;
    statusHuesped: string;
    fechaRegistro: Date; 
    fechaSalida: Date;   
  }


export interface HuespedRequest extends Huesped{ // Igual aquí
    usuarioRegistrador: {id_users: string};
    habitacionAsignada: {id_Rooms: string};
  }
  
  export interface HuespedResponse extends Huesped{
    idHuesped: string;
    usuarioRegistrador: User;
    habitacionAsignada: Room;
  }