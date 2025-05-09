export enum TypesRooms {
    normal = 'normal',
    doble = 'doble',
    plus = 'plus'
  }
  
  export enum TypesRoomsLevel {
    N1 = 'N1',
    N2 = 'N2'
  }
  
  export enum TypesRoomsStatus {
    ocupada = 'ocupada',
    libre = 'libre',
    limpieza = 'limpieza'
  }
  
  export interface Room {
    id_Rooms: number;
    habitacion: TypesRooms;
    nivel: TypesRoomsLevel;
    estado: TypesRoomsStatus;
    precio: number;
  }