import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; 

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const storedId = localStorage.getItem('idUser');
  const storedRole = localStorage.getItem('rol');
  const requiredRole = route.data['requiredRole'];
  const snackBar = inject(MatSnackBar);


  const router = inject(Router);

  if (!token) {
   
    alert('Debes iniciar sesión para acceder.');
    router.navigate(['/login']); 
    return false;
  }

  if (requiredRole && storedRole !== requiredRole) {
    alert('Acceso denegado: Rol no autorizado');
    router.navigate([`/${storedId}/habitaciones`]); 
    return false;
  }

  return true;
}