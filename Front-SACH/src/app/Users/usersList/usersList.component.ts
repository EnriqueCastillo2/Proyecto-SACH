import { ChangeDetectorRef, Component, inject, OnInit, TrackByFunction } from '@angular/core';
import { UsersService } from '../Users.service';
import { User } from '../user.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistroUsuarioDialogComponent } from '../registro-usuario-dialog/registro-usuario-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-history',
  imports: [MatProgressSpinnerModule,CommonModule],
  templateUrl: './usersList.component.html',
  styleUrl: './usersList.component.css',
})
export class UserHistoryComponent implements OnInit {
  users$: Observable<User[]> ;

  timestamp: number = Date.now();
  trackByUserId: TrackByFunction<User> = (index: number, user: User) => user.id_users;
  
  constructor(
    private dialog: MatDialog,
    private userService: UsersService,
    private snackBar: MatSnackBar,
  ) {
    this.users$ = this.userService.users$;
  }

  isLoading: boolean = false;

  ngOnInit() {
   this.userService.loadUsers();
  }



  
  abrirFormularioRegistro(user: User | null) {
    const dialogRef = this.dialog.open(RegistroUsuarioDialogComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'creado' || result === 'actualizado') {
      // this.userService.loadUsers(); // 💡 Asegúrate de que esto esté aquí
    this.timestamp = Date.now(); 
        
          const message =
            result === 'creado'
              ? 'Usuario creado con éxito'
              : 'Usuario actualizado con éxito';
          this.snackBar.open(message, 'Cerrar', {
            duration: 3000,
          });
        
      }
    });
  }
  

  delete(id: string) {
    this.userService.deleteUser(id).subscribe(() => {
      this.snackBar.open('Usuario eliminado con éxito', 'Cerrar', {
        duration: 3000,
      });
      this.userService.loadUsers(); 
    });

  }
}
