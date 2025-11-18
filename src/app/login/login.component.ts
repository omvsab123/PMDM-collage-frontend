import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';
  messageColor: string = 'red';
  isLoading: boolean = false;
  collegeData: any = null;

  constructor(private loginService: LoginService, private router: Router) { }

 onSubmit() {
  if (!this.username || !this.password) {
    this.message = 'Please fill in all fields';
    this.messageColor = 'red';
    return;
  }

  this.isLoading = true;
  this.message = 'Logging in...';
  this.messageColor = 'blue';

  this.loginService.login(this.username, this.password).subscribe(
    (response) => {
      this.isLoading = false;

      //  If response contains error or user is null → do not navigate
    if (!response || response.message === "Invalid username or password") {
  this.message = "Invalid username or password";
  this.messageColor = "red";
  return;
}



      // ✔ Save data and navigate only when login is valid
      this.loginService.setCollegeData(response);

      this.message = 'Login successful!';
      this.messageColor = 'green';

      this.router.navigate(['/dashboard']);
    },
    (error) => {
      this.isLoading = false;
      this.message = error.error?.message || 'Invalid username or password';
      this.messageColor = 'red';
    }
  );
}

}
