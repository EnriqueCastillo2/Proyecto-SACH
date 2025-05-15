import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersSubject= new BehaviorSubject<User[]>([]);
  users$= this.usersSubject.asObservable();
  private _http=inject(HttpClient);

  private userUrl= 'http://localhost:8080/users';

  loadUsers(){
    this._http.get<User[]>(this.userUrl).subscribe((users)=>{
      const newUsers = users.map(user => ({ ...user }));
      this.usersSubject.next(users);});  
  }
 

  getUsers():Observable<User[]>{
  return this.users$
  }

  getUserbyId(id: string): Observable<User> {
    return this._http.get<User>(`${this.userUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this._http.post<User>(this.userUrl, user).pipe(
      tap(() =>{
        this.loadUsers();

        })
    );
  }

  updateUser(id_users: string, user: User): Observable<User> {
    return this._http.put<User>(`${this.userUrl}/${id_users}`, user).pipe(
      tap(() =>{
        this.loadUsers();
      })
    );

  } 

  deleteUser(id: string): Observable<User> {
    return this._http.delete<User>(`${this.userUrl}/${id}`).pipe(
      tap(() =>{
        this.loadUsers();
      })
    );
  }

  login(username: string, password: string): Observable<string> {
  const loginData = { username, password };

  return this._http.post<{ token: string }>('http://localhost:8080/auth/login', loginData).pipe(
    tap(response => {
      localStorage.setItem('token', response.token); // Guardamos el token
    }),
    map(response => response.token) // Devolvemos solo el token si lo necesitas
  );
}


}
