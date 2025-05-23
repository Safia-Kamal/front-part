import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-studentschedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './studentschedule.component.html',
  styleUrl: './studentschedule.component.css'
})
export class StudentscheduleComponent {
  groupedSchedule: { [day: string]: any[] } = {};

  constructor(private http: HttpClient) {
    const studentId = localStorage.getItem("studentId");
    if (studentId) {
      this.loadStudentSchedule(+studentId);
    } else {
      console.warn("Student ID not found");
    }
  }

  loadStudentSchedule(studentId: number) {
    this.http.get(environment.baseUrl + `Student/${studentId}`).subscribe({
      next: (student: any) => {
        const className = student.className;
        if (className) {
          this.getScheduleByClassName(className);
        }
      },
      error: (err) => {
        console.error("Failed to fetch student", err);
      }
    });
  }

  getScheduleByClassName(className: string) {
    this.http.get(environment.baseUrl + `Timetable/ByClassName/${className}`)
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
  },
  error: (err) => {
    console.error("Failed to fetch schedule", err);
  }
});

  }

  getDays(): string[] {
    return Object.keys(this.groupedSchedule);
  }
}




// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { environment } from '../../../../environments/environment';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-studentschedule',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './studentschedule.component.html',
//   styleUrl: './studentschedule.component.css'
// })
// export class StudentscheduleComponent {
//   schedule: any[] = [];

//   constructor(private http: HttpClient) {
//     const studentId = localStorage.getItem("studentId");
//     if (studentId) {
//       this.loadStudentSchedule(+studentId);
//     } else {
//       console.warn("Student ID not found in localStorage");
//     }
//   }

//   loadStudentSchedule(studentId: number) {
//     this.http.get(environment.baseUrl + `Student/${studentId}`).subscribe({
//       next: (student: any) => {
//         const className = student.className;
//         console.log(className)
//         if (className != null) {
//           this.getScheduleByClassName(className);
//         } else {
//           console.warn("No Class found for this student.");
//         }
//       },
//       error: (err) => {
//         console.error("Failed to fetch student data", err);
//       }
//     });
//   }

//   getScheduleByClassName(className: string) {
//     this.http.get(environment.baseUrl + `Timetable/ByClassName/${className}`)
//     .subscribe({
//       next: (data: any) => {
//         this.schedule = data;
//       },
//       error: (err) => {
//         console.error("Failed to fetch schedule", err);
//       }
//     });
//   }
// }
