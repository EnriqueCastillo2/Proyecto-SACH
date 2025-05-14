import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room, TypesRoomsStatus } from './rooms.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private _http = inject(HttpClient);
  private roomsUrl = 'http://localhost:8080/rooms';

  getRooms(): Observable<Room[]> {
    return this._http.get<Room[]>(this.roomsUrl);
  }

  getRoomById(id: number): Observable<Room> {
    return this._http.get<Room>(`${this.roomsUrl}/${id}`);
  }

  createRoom(room: Room): Observable<Room> {
    return this._http.post<Room>(this.roomsUrl, room);
  }

  updateRoom(id_rooms: number, room: Room): Observable<Room> {
    return this._http.put<Room>(`${this.roomsUrl}/${id_rooms}`, room);
  }

  deleteRoom(id: number): Observable<Room> {
    return this._http.delete<Room>(`${this.roomsUrl}/${id}`);
  }
  changeStatus(id: number, status: string): Observable<TypesRoomsStatus> {
    return this._http.patch<TypesRoomsStatus>(`${this.roomsUrl}/${id}/estado`, { estado: status });
  }
}
