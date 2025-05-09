import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _http=inject(HttpClient);
  private userUrl= 'http://localhost:8080/users';

 

  getUsers():Observable<User[]>{
    return this._http.get<User[]>(this.userUrl);
  }

  getUserbyId(id: string): Observable<User> {
    return this._http.get<User>(`${this.userUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this._http.post<User>(this.userUrl, user);
  }

  updateUser(id_users: string, user: User): Observable<User> {
    return this._http.put<User>(`${this.userUrl}/${id_users}`, user);

  } 
  deleteUser(id: string): Observable<User> {
    return this._http.delete<User>(`${this.userUrl}/${id}`);
  }
}
