import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  HuespedRequest, HuespedResponse } from './huesped.model';

@Injectable({
  providedIn: 'root'
})
export class HuespedService {

  private huespedUrl = 'http://localhost:8080/huesped';

  constructor(private _http: HttpClient = inject(HttpClient)) { }

  getHuesped():Observable<HuespedResponse[]>{
    return this._http.get<HuespedResponse[]>(this.huespedUrl);
  }

  getHuespedbyId(id: string): Observable<HuespedResponse> {
    return this._http.get<HuespedResponse>(`${this.huespedUrl}/${id}`);
  }

  createHuesped(user: HuespedRequest): Observable<HuespedRequest> {
    return this._http.post<HuespedRequest>(this.huespedUrl, user);
  }

  updateHuesped(id_huesped: string, huesped: HuespedRequest): Observable<HuespedRequest> {
    return this._http.put<HuespedRequest>(`${this.huespedUrl}/${id_huesped}`, huesped);

  } 
  deleteUser(id: string): Observable<HuespedRequest> {
    return this._http.delete<HuespedRequest>(`${this.huespedUrl}/${id}`);
  }
}
