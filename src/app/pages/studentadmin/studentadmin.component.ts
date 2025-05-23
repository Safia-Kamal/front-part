import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

declare var bootstrap: any;

@Component({
  selector: 'app-studentadmin',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './studentadmin.component.html',
  styleUrl: './studentadmin.component.css'
})
export class StudentadminComponent {
  @ViewChild('addStudentModal') addStudentModal: any;
  students: any = [];
  classes: any = [];
  std: any = {
    id: 0,
    name: "",
    classId: "",
    parentNationalId: ""
  };
  isEditMode: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.getAllStudents();
    this.getAllClasses();
  }

  getAllStudents() {
    this.http.get(environment.baseUrl + 'Student').subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getAllClasses() {
    this.http.get(environment.baseUrl + 'Class').subscribe({
      next: (data) => {
        this.classes = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addStudent() {
    if (!this.std.name || !this.std.classId || !this.std.parentNationalId) {
      alert('Please fill all required fields');
      return;
    }
    this.http.post(environment.baseUrl + 'Student', this.std).subscribe({
      next: () => {
        alert("Student added successfully!");
        this.getAllStudents();
        this.closeModal();
      },
      error: (err) => {
        console.log(err);
        alert("Failed to add student");
      }
    });
  }

  deleteStudent(id: number) {
    this.http.delete(environment.baseUrl + `Student/${id}`).subscribe({
      next: () => {
        alert("Student deleted successfully!");
        this.getAllStudents();
      },
      error: (err) => {
        console.log(err);
        alert("Failed to delete student");
      }
    });
  }

  openAddModal() {
    this.resetForm();
    const modal = new bootstrap.Modal(document.getElementById('addStudentModal'));
    modal.show();
  }

  openEditModal(student: any) {
    this.isEditMode = true;
    this.std = {
      id: student.id,
      name: student.name,
      parentNationalId: student.parentNationalId,
      classId: student.classId || student.class?.id
    };
    const modal = new bootstrap.Modal(document.getElementById('addStudentModal'));
    modal.show();
  }

  updateStudent() {
    if (!this.std.id || !this.std.name || !this.std.parentNationalId || !this.std.classId) {
      alert("Please fill all fields");
      return;
    }

    const url = environment.baseUrl +`Student/${this.std.id}`;
    const body = {
      name: this.std.name,
      parentNationalId: this.std.parentNationalId,
      classId: this.std.classId
    };

    this.http.put(url, body).subscribe({
      next: () => {
        alert("Student updated successfully!");
        this.getAllStudents();
        this.closeModal();
      },
      error: (err) => {
        console.log(err);
        alert("Failed to update student");
      }
    });
  }

  closeModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('addStudentModal'));
    modal?.hide();
    this.resetForm();
  }

  resetForm() {
    this.std = {
      id: 0,
      name: "",
      classId: "",
      parentNationalId: ""
    };
    this.isEditMode = false;
  }
}
