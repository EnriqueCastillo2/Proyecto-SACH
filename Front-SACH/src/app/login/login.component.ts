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

  constructor(private userService: UsersService, private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.userService.getUserbyId(this.username).subscribe({
      next: (user) => {
        if (user.password === this.password) {
          console.log('Login exitoso');
          // Redirigir o guardar usuario
          this.router.navigate(['/habitaciones']);
        } else {
          alert('Contraseña incorrecta');
        }
      },
      error: () => {
        
        alert('Usuario no encontrado');
      },
    });

  }
}