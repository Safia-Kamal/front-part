import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-teacherdashboard',
  imports: [ReactiveFormsModule , FormsModule , CommonModule],
  templateUrl: './teacherdashboard.component.html',
  styleUrl: './teacherdashboard.component.css'
})
export class TeacherdashboardComponent {
numOfStd:any=0
  constructor(private http:HttpClient){
    const teachId = localStorage.getItem("studentId")
    console.log(teachId)
    if(teachId != null){
      this.getNumOfStd(+teachId)
    }else{
    console.log("Teacher Id Not Found")
    }

  }

  getNumOfStd(id:number){
    this.http.get(environment.baseUrl+`InGeneral/${id}`).subscribe({
      next:(data)=>{
        console.log(data)
        this.numOfStd = data
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
