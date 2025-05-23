import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

declare var bootstrap: any;

@Component({
  selector: 'app-timetableadmin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './scheduleadmin.component.html',
  styleUrl: './scheduleadmin.component.css'
})
export class ScheduleadminComponent {
  @ViewChild('timetableModal') timetableModal!: ElementRef;
cls:any=[]
sub:any=[]
teaches:any=[]
  timetables: any[] = [];
  tt: any = {
  id: 0,
  classId: "",
  subjectId: "",
  teacherId: "",
  dayOfWeek: "",
  timeSlot: "",
  startTime: "",
  endTime: ""
};

getAllClasses(){
  this.http.get(environment.baseUrl + 'Class')
      .subscribe({
        next: (data) => {
          this.cls = data;
        },
        error: (err) => {
          console.error(err);
          alert('Failed to load classes');
        }
      });
}

getAllTeachers(){
  this.http.get(environment.baseUrl+'Teacher')
      .subscribe({
        next: (data) => {
          this.teaches = data;
        },
        error: (err) => {
          console.error(err);
          alert('Failed to load teachers');
        }
      });
}

getAllSujects(){
  this.http.get(environment.baseUrl + 'Subject').subscribe({
      next: (data) => {
        this.sub = data;
      },
      error: (err) => {
        console.error(err);
        alert('Failed to load subjects');
      }
    });

}
  isEditMode: boolean = false;

  constructor(private http: HttpClient) {
    this.getTimetables();
    this.getAllClasses();
    this.getAllSujects();
    this.getAllTeachers();
  }

  getTimetables() {
    this.http.get(environment.baseUrl + 'Timetable')
      .subscribe({
        next: (data: any) => {
          this.timetables = data;
        },
        error: (err) => {
          console.error(err);
          alert('Failed to load timetables');
        }
      });
  }

  confirmDelete(id: number) {
    if (confirm('Are you sure you want to delete this timetable?')) {
      this.deleteTimetable(id);
    }
  }

  deleteTimetable(id: number) {
    this.http.delete(environment.baseUrl + `Timetable?id=${id}`)
      .subscribe({
        next: () => {
          alert("Timetable deleted successfully");
          this.getTimetables();
        },
        error: (err) => {
          console.error(err);
          alert("Failed to delete timetable");
        }
      });
  }

  openAddModal() {
    this.resetForm();
    this.showModal();
  }

  openEditModal(tt: any) {
    this.isEditMode = true;
    this.tt = {
      id: tt.id,
      classId: tt.classId,
      subjectId: tt.subjectId,
      teacherId: tt.teacherId,
      dayOfWeek: tt.dayOfWeek,
      startTime: tt.startTime,
      endTime: tt.endTime
    };
    this.showModal();
  }

  showModal() {
    const modal = new bootstrap.Modal(this.timetableModal.nativeElement);
    modal.show();
  }

  addTimetable() {
    if (!this.tt.classId || !this.tt.subjectId || !this.tt.teacherId || !this.tt.dayOfWeek || !this.tt.startTime || !this.tt.endTime) {
      alert('Please fill all required fields');
      return;
    }

    this.http.post(environment.baseUrl + 'Timetable', this.tt)
      .subscribe({
        next: () => {
          alert("Timetable added successfully");
          this.getTimetables();
          this.closeModal();
        },
        error: (err) => {
          console.error(err);
          alert("Failed to add timetable");
        }
      });
  }

  updateTimetable() {
    const url = environment.baseUrl + `Timetable/${this.tt.id}`;
    const body = {
      classId: this.tt.classId,
      subjectId: this.tt.subjectId,
      teacherId: this.tt.teacherId,
      dayOfWeek: this.tt.dayOfWeek,
      startTime: this.tt.startTime,
      endTime: this.tt.endTime
    };

    this.http.put(url, body)
      .subscribe({
        next: () => {
          alert("Timetable updated successfully");
          this.getTimetables();
          this.closeModal();
        },
        error: (err) => {
          console.error(err);
          alert("Failed to update timetable");
        }
      });
  }

  closeModal() {
    const modal = bootstrap.Modal.getInstance(this.timetableModal.nativeElement);
    modal?.hide();
    this.resetForm();
  }

  resetForm() {
    this.tt = {
      id: 0,
      classId: "",
      subjectId: "",
      teacherId: "",
      dayOfWeek: "",
      startTime: "",
      endTime: ""
    };
    this.isEditMode = false;
  }

  onTimeSlotChange() {
  switch (this.tt.timeSlot) {
    case 'slot1':
      this.tt.startTime = '08:00';
      this.tt.endTime = '10:00';
      break;
    case 'slot2':
      this.tt.startTime = '10:00';
      this.tt.endTime = '12:00';
      break;
    case 'slot3':
      this.tt.startTime = '12:00';
      this.tt.endTime = '14:00';
      break;
    default:
      this.tt.startTime = '';
      this.tt.endTime = '';
  }
}

}

 
