import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-teachergrades',
  imports: [CommonModule , FormsModule , ReactiveFormsModule],
  templateUrl: './teachergrades.component.html',
  styleUrl: './teachergrades.component.css'
})
export class TeachergradesComponent {
  classes: any[] = [];
  students: any[] = [];
  selectedSubject: string = '';

  constructor(private http: HttpClient) {
    const teachId = localStorage.getItem("studentId");
    if (teachId != null) {
      this.getTeacherSubjects(+teachId);
    } else {
      console.log("Can't find teacher ID");
    }
  }

  getTeacherSubjects(tchId: number) {
    this.http.get<any[]>(environment.baseUrl + `TeacherSubject/ByTeacherId/${tchId}`)
      .subscribe({
        next: (data) => {
          this.classes = data;
        },
        error: (err) => {
          console.error("Error loading subjects:", err);
        }
      });
  }

  onSubjectChange() {
    if (this.selectedSubject) {
      const subject = this.classes.find((c: any) => c.subjectName === this.selectedSubject);
      if (subject) {
        console.log(subject.id)
        this.getStudentsWithGrades(this.selectedSubject, subject.id);
      }
    }
  }

  getStudentsWithGrades(subName: string, subjectId: number) {
    this.http.get<any[]>(environment.baseUrl + `StudentSubject/SubjectName/${subName}`)
      .subscribe({
        next: (studentsData) => {
          const studentsWithGrades: any[] = [];

          const requests = studentsData.map(student =>
            this.http.get<any[]>(environment.baseUrl + `Grade/ByStudentId/${student.id}`).toPromise()
              .then(grades => {
                const subjectGrade = grades?.find(g => g.subjectName === subName);
                studentsWithGrades.push({
                  ...student,
                  currentGrade: subjectGrade ? subjectGrade.value : null,
                  grade: null
                });
              })
          );

          Promise.all(requests).then(() => {
            this.students = studentsWithGrades;
          }).catch(err => {
            console.error("Error loading grades for students:", err);
          });
        },
        error: (err) => {
          console.error("Error loading students for subject:", err);
        }
      });
  }

  saveAllGrades() {
    const subject = this.classes.find((c: any) => c.subjectName === this.selectedSubject);
    const subjectId = subject?.id;
    // console.log(subjectId)
    if (!subjectId) {
      console.error("Subject ID not found!");
      return;
    }

    this.students.forEach((student: any) => {
      if (student.grade != null && student.grade !== student.currentGrade) {
        const gradeObj = {
          studentId: student.id,
          subjectId: subjectId,
          value: student.grade
        };

        this.http.post(environment.baseUrl + 'Grade', gradeObj)
          .subscribe({
            next: (res) => {
              console.log(gradeObj)
              console.log("Grade saved:", res);
              student.currentGrade = student.grade;
              student.grade = null;
            },
            error: (err) => {
              console.error(`Failed to save grade for ${student.studentName}`, err);
            }
          });
      }
    });

    alert("Grades saved successfully!");
  }
}








// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { environment } from '../../../../environments/environment';

// @Component({
//   selector: 'app-teachergrades',
//   imports: [CommonModule , FormsModule , ReactiveFormsModule],
//   templateUrl: './teachergrades.component.html',
//   styleUrl: './teachergrades.component.css'
// })

// export class TeachergradesComponent {
//   classes: any = [];
//   students: any = [];
//   selectedSubject: string = '';

//   constructor(private http: HttpClient) {
//     const teachId = localStorage.getItem("studentId");
//     if (teachId != null) {
//       this.getTeacherSubjects(+teachId);
//     } else {
//       console.log("can't find teacher id");
//     }
//   }

//   getTeacherSubjects(tchId: number) {
//     this.http.get(environment.baseUrl +`TeacherSubject/ByTeacherId/${tchId}`)
//       .subscribe({
//         next: (data: any) => {
//           this.classes = data;
//         },
//         error: (err) => {
//           console.log(err);
//         }
//       });
//   }

//   onSubjectChange() {
//     if (this.selectedSubject) {
//       this.getStudentsBySubName(this.selectedSubject);
//     }
//   }

//   getStudentsBySubName(subName: string) {
//     this.http.get(environment.baseUrl + `StudentSubject/SubjectName/${subName}`)
//       .subscribe({
//         next: (data: any) => {
//           this.students = data.map((st: any) => ({
//             ...st,
//             grade: null
//           }));
//         },
//         error: (err) => {
//           console.log(err);
//         }
//       });
//   }


//   saveAllGrades() {
//     const subject = this.classes.find((c: any) => c.subjectName === this.selectedSubject);
//     const subjectId = subject?.id;

//     if (!subjectId) {
//       console.error("Subject ID not found!");
//       return;
//     }

//     this.students.forEach((student: any) => {
//       if (student.grade != null) {
//         const gradeObj = {
//           studentId: student.id,
//           subjectId: subjectId,
//           value: student.grade
//         };

//         this.http.post(environment.baseUrl + 'Grade', gradeObj)
//           .subscribe({
//             next: (res) => {
//               // console.log(Grade saved for student ${student.studentName});
//               alert("Grades Saved Successfully")
//             },
//             error: (err) => {
//               // console.error(Failed to save grade for ${student.studentName}, err);
//               alert("Failed to save grades ")
//             }
//           });
//       }
//     });
//   }
//   resetForm() {
 
// }
// }