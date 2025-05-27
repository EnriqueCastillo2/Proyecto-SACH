import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const router = inject(Router); // Usamos inject porque es un interceptor funcional

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403 || error.status === 401) {
        // Opcional: Limpia el localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('idUser');
        localStorage.removeItem('rol');

        // Redirige al login
        router.navigate(['/login']);

        // Opcional: puedes usar un servicio de notificación
        console.warn('Sesión expirada o sin permisos. Redirigiendo al login...');
      }

      return throwError(() => error);
    })
  );
};
