import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Room, TypesRoomsStatus } from './rooms.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private roomsSubject= new BehaviorSubject<Room[]>([]);
  rooms$=this.roomsSubject.asObservable();
  private _http = inject(HttpClient);
  private roomsUrl = 'http://localhost:8080/rooms';

  loadRooms(){
    this._http.get<Room[]>(this.roomsUrl).subscribe((rooms)=>{
      const newRooms=rooms.map(room=>({...room}));
      this.roomsSubject.next(rooms);
    })
  }

  getRooms(): Observable<Room[]> {
    return this.rooms$;
  }

  getRoomById(id: number): Observable<Room> {
    return this._http.get<Room>(`${this.roomsUrl}/${id}`);
  }

  createRoom(room: Room): Observable<Room> {
    return this._http.post<Room>(this.roomsUrl,room).pipe(
      tap(()=>{
        this.loadRooms();
      })
    )
  }

  updateRoom(id_rooms: number, room: Room): Observable<Room> {
    return this._http.put<Room>(`${this.roomsUrl}/${id_rooms}`, room).pipe(
      tap(()=>{
        this.loadRooms();
      })
    )
  }

  deleteRoom(id: number): Observable<Room> {
    return this._http.delete<Room>(`${this.roomsUrl}/${id}`).
    pipe(
      tap(()=>{
        this.loadRooms();
      })
    )
  }
  
  changeStatus(id: number, status: string): Observable<TypesRoomsStatus> {
    return this._http.patch<TypesRoomsStatus>(`${this.roomsUrl}/${id}/estado`, { estado: status });
  }
}
