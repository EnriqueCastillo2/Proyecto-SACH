import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
// import { ReservacionComponent } from './reservacion/reservacion.component';

export const routes: Routes = [

    {
    path: '',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
    pathMatch: 'full'
    },


    {
    path: 'users',
    loadComponent: () => import('./Users/usersList/usersList.component').then(c => c.UserHistoryComponent),
    canActivate: [authGuard]
        
    },
    {
    path: 'registro-usuario', 
    loadComponent: () => import('./Users/registro-usuario-dialog/registro-usuario-dialog.component').then(c => c.RegistroUsuarioDialogComponent),
     canActivate: [authGuard]
    },

    {
        path: 'habitaciones',
        loadComponent: () => import('./Habitaciones/rooms/rooms.component').then(c => c.RoomsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'huesped',
        loadComponent: () => import('./Huesped/huesped/huesped.component').then(c => c.HuespedComponent),
        canActivate: [authGuard]
    },
    {
        path: 'RegistroHuesped',
        loadComponent: () => import('./reservacion/reservacion.component').then(c => c.ReservacionComponent),
        canActivate: [authGuard]
    },

    {
    path:'**',
    redirectTo: '',
    }

    
    
];