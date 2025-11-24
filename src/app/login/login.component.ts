import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  email: string = '';
  password: string = '';

  message: string = '';
  messageColor: string = 'red';
  isLoading: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {

    if (!this.email || !this.password) {
      this.message = 'Please fill all fields';
      this.messageColor = 'red';
      return;
    }

    this.isLoading = true;

    this.loginService.login(this.email, this.password).subscribe({
     next: (res) => {
  this.isLoading = false;

  if (!res.success) {
    this.message = res.message || "Invalid credentials";
    this.messageColor = "red";
    return;
  }

  this.loginService.saveLoginData(res);

  this.message = "Login successful!";
  this.messageColor = "green";

  this.router.navigate(['/dashboard']);
},

      error: (err) => {
        this.isLoading = false;
        this.message = err.error?.message || 'Invalid email or password';
        this.messageColor = 'red';
      }
    });
  }
}
