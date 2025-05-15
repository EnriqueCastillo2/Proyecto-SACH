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
     this.userService.login(this.username, this.password).subscribe({
    next: (token) => {
     
      this.router.navigate(['/habitaciones']);
    },
    error: (err) => {
      alert('Credenciales incorrectas o usuario no encontrado');
      console.error(err);
    }
  });

  }
}