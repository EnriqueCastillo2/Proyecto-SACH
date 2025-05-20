import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { HomeSectionComponent } from './home-section/home-section.component';

export const routes: Routes = [

     {
    path: '',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
    pathMatch: 'full',
    
    },

    {

    path: 'SACH',
    loadComponent: () => import('./home-section/home-section.component').then(c => c.HomeSectionComponent), 
    canActivate: [authGuard],
    children: [
      {
        path: 'users',
        loadComponent: () => import('./Users/usersList/usersList.component').then(c => c.UserHistoryComponent),
        data: { requiredRole: 'admin',title:'Gestion de Usuarios' }
      },
      {
        path: 'habitaciones',
        loadComponent: () => import('./Habitaciones/rooms/rooms.component').then(c => c.RoomsComponent),
        data:{title:'Habitaciones'}
      },
      {
        path: 'huesped',
        loadComponent: () => import('./Huesped/huesped/huesped.component').then(c => c.HuespedComponent),
        data:{title:'Gestion de Huespedes'}
      },
      {
        path: 'RegistroHuesped/:id',
        loadComponent: () => import('./reservacion/reservacion.component').then(c => c.ReservacionComponent),
        data:{title:'Registro Huesped'}
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }

];