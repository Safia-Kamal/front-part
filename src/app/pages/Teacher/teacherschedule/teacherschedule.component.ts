import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-teacherschedule',
  imports: [ReactiveFormsModule , CommonModule , FormsModule],
  templateUrl: './teacherschedule.component.html',
  styleUrl: './teacherschedule.component.css'
})
export class TeacherscheduleComponent {
  groupedSchedule:{ [day:string] : any[] } ={}
  constructor(private http:HttpClient){
    const teacherId = localStorage.getItem("studentId")
    if(teacherId){
    this.getTeacherTimetable(+teacherId);
    }else{
      console.log("Teacher Id not found")
    }
  }

  getTeacherTimetable(teacherId:number){
    // https://localhost:7092/api/Timetable/ByTeacherId/1003
    this.http.get(environment.baseUrl+`Timetable/ByTeacherId/${teacherId}`)
      .subscribe({
        next: (data: any) => {
        const schedule = data as any[];

        this.groupedSchedule = {};
        schedule.forEach(item => {
          const day = item.dayOfWeek.toLowerCase();
          if (!this.groupedSchedule[day]) this.groupedSchedule[day] = [];
          this.groupedSchedule[day].push(item);
            });

          for (let day in this.groupedSchedule) {
              this.groupedSchedule[day].sort((a, b) => a.startTime.localeCompare(b.startTime));
          }
          },error:(err)=>{
              console.log(err)
            }
      })
  }

}
