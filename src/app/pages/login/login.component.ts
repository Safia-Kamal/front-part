import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: any = {
    "UserName": "",
    "Password": "",
  };

  http = inject(HttpClient);

  constructor(private router: Router) {}

  OnLogin() {
    this.http.post(environment.baseUrl + 'Account/Login', this.loginObj)
      .subscribe({
        next: (res: any) => {
          if (res && res.token) {
            alert("Login Success");

            localStorage.setItem("token", res.token);
            localStorage.setItem("username", res.username);
            localStorage.setItem("role", res.role);
            localStorage.setItem("studentId", res.relatedId);

            
            if (res.role ==='Student') {
              this.router.navigate(['/student']);
            } else if (res.role === 'Admin') {
              this.router.navigate(['/dashboard']);
            } else if (res.role === 'Teacher') {
              this.router.navigate(['/teacher']);
            } 
            else {
              alert("Unsupported role");
            }
          } 
          else {
            alert("Invalid UserName or Password");
          }
        },
        error: (err) => {
          alert("Login failed: " + err.error);
        }
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

