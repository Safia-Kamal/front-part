import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet , RouterLink ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
constructor(private router:Router){}

  logout(){

    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("role")
    localStorage.removeItem("studentId")

    this.router.navigate(['/login'])
    
  }
}
