// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { ReactiveFormsModule } from '@angular/forms';
// import { environment } from '../../../../environments/environment';

// @Component({
//   selector: 'app-studentprogress',
//   imports: [ReactiveFormsModule,CommonModule],
//   templateUrl: './studentprogress.component.html',
//   styleUrl: './studentprogress.component.css'
// })
// export class StudentprogressComponent {
//   std:any={
//     id:0,
//     name:"",
//     parentNationalId:""
//   }
// stdGrades:any=[]
//   constructor(private http:HttpClient){
//     this.getStudentGrades(this.std.id);
//   }
//   // https://localhost:7092/api/Grade/ByStudentId/1
//   // "id": 1,
//   //   "studentName": "hady fady ",
//   //   "subjectName": "Physics",
//   //   "value": 77

//  getStudentGrades(id:number){
//   this.http.get(environment.baseUrl+`Grade/ByStudentId/${id}`)
//   .subscribe({
//     next:(data)=>{
//       console.log(data)
//       this.stdGrades = data
//     },
//     error:(err)=>{
//       console.log(err)
//     }
//   })
//  }

// }

// -------------------------------------------------------------

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-studentprogress',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './studentprogress.component.html',
  styleUrl: './studentprogress.component.css'
})
export class StudentprogressComponent {
  stdGrades: any = [];

  constructor(private http: HttpClient) {
    const studentId = localStorage.getItem("studentId");
    if (studentId) {
      this.getStudentGrades(+studentId); // +string → number
    } else {
      console.warn("No student ID found in localStorage");
    }
  }

  getStudentGrades(id: number) {
    this.http.get(environment.baseUrl + `Grade/ByStudentId/${id}`)
      .subscribe({
        next: (data) => {
          console.log("Grades fetched:", data);
          this.stdGrades = data;
        },
        error: (err) => {
          console.error("Error fetching grades:", err);
        }
      });
  }
}

