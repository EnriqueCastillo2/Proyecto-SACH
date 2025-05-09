import { Routes } from '@angular/router';
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
    pathMatch: 'full'
        
    },
    {
    path: 'registro-usuario', 
    loadComponent: () => import('./Users/registro-usuario-dialog/registro-usuario-dialog.component').then(c => c.RegistroUsuarioDialogComponent),
    pathMatch: 'full'
    },

    {
        path: 'habitaciones',
        loadComponent: () => import('./Habitaciones/rooms/rooms.component').then(c => c.RoomsComponent),
        pathMatch: 'full'
    },
    {
        path: 'huesped',
        loadComponent: () => import('./Huesped/huesped/huesped.component').then(c => c.HuespedComponent),
        pathMatch: 'full'
    },
    {
        path: 'RegistroHuesped',
        loadComponent: () => import('./reservacion/reservacion.component').then(c => c.ReservacionComponent),
        pathMatch: 'full'
    },

    {
    path:'**',
    redirectTo: '',
    }

    
    
];