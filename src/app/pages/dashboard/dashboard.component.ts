import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

interface StudentsAndClassesDTO{
  totalStudents:number,
  totalClasses:number,
  totalTeachers:number,
  totalSubjects:number

}
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent {
  statisticsObj:any = {};

  constructor(private http:HttpClient,router: Router){  
     this.fetchStatistics();
  }

  fetchStatistics(){
    this.http.get<StudentsAndClassesDTO>("https://localhost:7092/api/InGeneral")
    .subscribe({
        next: (data) => {
          // console.log(data);
          this.statisticsObj = data

        },
        error: (err) => {
          console.error("Error fetching statistics:", err);
        }
      });
  }

}
