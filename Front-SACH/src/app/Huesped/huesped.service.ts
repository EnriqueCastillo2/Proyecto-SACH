import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HuespedRequest, HuespedResponse } from './huesped.model';

@Injectable({
  providedIn: 'root'
})
export class HuespedService {
  private _http = inject(HttpClient);
  private huespedUrl = 'http://localhost:8080/huesped';

  private huespedSubject = new BehaviorSubject<HuespedResponse[]>([]);
  huesped$ = this.huespedSubject.asObservable();

 private huespedAEditarSubject = new BehaviorSubject<HuespedResponse | null>(null);
 huespedAEditar$ = this.huespedAEditarSubject.asObservable();
 

setHuespedAEditar(huesped: HuespedResponse) {
  this.huespedAEditarSubject.next(huesped);
}

clearHuespedAEditar() {
  this.huespedAEditarSubject.next(null);
}

 
  loadHuespedes() {
  
     this._http.get<HuespedResponse[]>(this.huespedUrl).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 404) {
        // Si no hay huéspedes, simulamos una lista vacía
        this.huespedSubject.next([]);
        return of([]); // Se devuelve un observable con lista vacía
      }
      return throwError(() => error); // Otros errores se lanzan normalmente
    })
  ).subscribe((huespedes) => {
    const nuevos = huespedes.map(h => ({ ...h }));
    this.huespedSubject.next(nuevos);
  });
  }

  getHuespedes(): Observable<HuespedResponse[]> {
     if (this.huespedSubject.value.length === 0) {
    this.loadHuespedes(); // Solo carga si está vacío
  }
    return this.huesped$;
  }

  getHuespedbyId(id: string): Observable<HuespedResponse> {
    return this._http.get<HuespedResponse>(`${this.huespedUrl}/${id}`);
  }

  createHuesped(huesped: HuespedRequest): Observable<HuespedRequest> {
    return this._http.post<HuespedRequest>(this.huespedUrl, huesped).pipe(
      tap(() => this.loadHuespedes())
    );
  }

  updateHuesped(id_huesped: string, huesped: HuespedRequest): Observable<HuespedRequest> {
    return this._http.put<HuespedRequest>(`${this.huespedUrl}/${id_huesped}`, huesped).pipe(
      tap(() => this.loadHuespedes())
    );
  }

  deleteHuesped(id: string): Observable<HuespedRequest> {
    return this._http.delete<HuespedRequest>(`${this.huespedUrl}/${id}`).pipe(
      tap(() => this.loadHuespedes())
    );
  }
}
