import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../Users.service';
import { User } from '../user.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistroUsuarioDialogComponent } from '../registro-usuario-dialog/registro-usuario-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-history',
  imports: [MatProgressSpinnerModule],
  templateUrl: './usersList.component.html',
  styleUrl: './usersList.component.css',
})
export class UserHistoryComponent implements OnInit {
  
  constructor(
    private dialog: MatDialog,
    private userService: UsersService,
    private snackBar: MatSnackBar,
  ) {}

  users: User[] = [];
  isLoading: boolean = false;

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  
  abrirFormularioRegistro(user: User | null) {
    const dialogRef = this.dialog.open(RegistroUsuarioDialogComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'creado' || result === 'actualizado') {
        this.isLoading = true;
        setTimeout(() => {

          this.cargarUsuarios();
          this.isLoading = false;
          const message =
            result === 'creado'
              ? 'Usuario creado con éxito'
              : 'Usuario actualizado con éxito';
          this.snackBar.open(message, 'Cerrar', {
            duration: 3000,
          });
        }, 1500);
      }
    });
  }
  

  delete(id: string) {
    this.userService.deleteUser(id).subscribe(() => {
      this.snackBar.open('Usuario eliminado con éxito', 'Cerrar', {
        duration: 3000,
      });
      this.cargarUsuarios();
    });
  }
}
