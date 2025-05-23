import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

declare var bootstrap: any;

@Component({
  selector: 'app-teacheradmin',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './teacheradmin.component.html',
  styleUrl: './teacheradmin.component.css'
})
export class TeacheradminComponent {
  @ViewChild('teacherModal') teacherModal!: ElementRef;
  
  teachers: any = [];
  tch: any = {
    id: 0,
    name: "",
    nationalId: ""
  };
  isEditMode: boolean = false;

  constructor(private http: HttpClient) {
    this.getTeachers();
  }

  getTeachers() {
    this.http.get(environment.baseUrl+'Teacher')
      .subscribe({
        next: (data) => {
          this.teachers = data;
        },
        error: (err) => {
          console.error(err);
          alert('Failed to load teachers');
        }
      });
  }

  confirmDelete(id: number) {
    if (confirm('Are you sure you want to delete this teacher?')) {
      this.deleteTeacher(id);
    }
  }

  deleteTeacher(id: number) {
    this.http.delete(environment.baseUrl+`Teacher/${id}`)
      .subscribe({
        next: () => {
          alert("Teacher deleted successfully");
          this.getTeachers();
        },
        error: (err) => {
          console.error(err);
          alert("Failed to delete teacher");
        }
      });
  }

  openAddModal() {
    this.resetForm();
    this.showModal();
  }

  openEditModal(teacher: any) {
    this.isEditMode = true;
    this.tch = {
      id: teacher.id,
      name: teacher.name,
      nationalId: teacher.nationalId
    };
    this.showModal();
  }

  showModal() {
    const modal = new bootstrap.Modal(this.teacherModal.nativeElement);
    modal.show();
  }

  addTeacher() {
    if (!this.tch.name || !this.tch.nationalId) {
      alert('Please fill all required fields');
      return;
    }

    this.http.post(environment.baseUrl+'Teacher', this.tch)
      .subscribe({
        next: () => {
          alert("Teacher added successfully");
          this.getTeachers();
          this.closeModal();
        },
        error: (err) => {
          console.error(err);
          alert("Failed to add teacher");
        }
      });
  }

updateTeacher() {
  const url = environment.baseUrl+`Teacher?id=${this.tch.id}`;
  const body = {
    name: this.tch.name,
    nationalId: this.tch.nationalId
  };

  this.http.put(url, body)
    .subscribe({
      next: (data) => {
        alert("Teacher Updateي Successfully");
        this.getTeachers();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error details:', err);
        alert("Failed Update Teacher Info");
      }
    });
}

  closeModal() {
    const modal = bootstrap.Modal.getInstance(this.teacherModal.nativeElement);
    modal?.hide();
    this.resetForm();
  }

  resetForm() {
    this.tch = {
      id: 0,
      name: "",
      nationalId: ""
    };
    this.isEditMode = false;
  }
}