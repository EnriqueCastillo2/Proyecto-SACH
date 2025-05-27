import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../Users/Users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  loginErrorMessage:string='';
  constructor(private userService: UsersService, private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
  this.loginErrorMessage='';

 if (!this.username || !this.password) {
      this.loginErrorMessage = 'Por favor,revise o complete ambos campos.';
      return;
    }



     this.userService.login(this.username, this.password).subscribe({
    next: (response) => {
     const id = response.idUser;
      this.router.navigate(['/SACH/habitaciones']);
    },
     error: (err) => {

       if (err.status === 0) {
          // No hay conexión con el servidor
          this.loginErrorMessage = 'No se pudo conectar con el servidor.  ';
        } else {
          // Error de autenticación u otro
          this.loginErrorMessage = 'Credenciales incorrectas o usuario no encontrado. Valide que su nombre y contraseña sean correctos.';
        }
        console.error(err);
      }
   
  });

  }
}