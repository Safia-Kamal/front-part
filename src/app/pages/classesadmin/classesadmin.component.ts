// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-classesadmin',
//   imports: [],
//   templateUrl: './classesadmin.component.html',
//   styleUrl: './classesadmin.component.css'
// })
// export class ClassesadminComponent {

// }

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

declare var bootstrap: any;

@Component({
  selector: 'app-classadmin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './classesadmin.component.html',
  styleUrl: './classesadmin.component.css'
})
export class ClassesadminComponent {
  @ViewChild('classModal') classModal!: ElementRef;

  classes: any = [];
  cls: any = {
    id: 0,
    name: "",
    gradeLevel: ""
  };
  isEditMode: boolean = false;

  constructor(private http: HttpClient) {
    this.getClasses();
  }

  getClasses() {
    this.http.get(environment.baseUrl + 'Class')
      .subscribe({
        next: (data) => {
          this.classes = data;
        },
        error: (err) => {
          console.error(err);
          alert('Failed to load classes');
        }
      });
  }

  confirmDelete(id: number) {
    if (confirm('Are you sure you want to delete this class?')) {
      this.deleteClass(id);
    }
  }

  deleteClass(id: number) {
    this.http.delete(environment.baseUrl + `Class/${id}`)
      .subscribe({
        next: () => {
          alert("Class deleted successfully");
          this.getClasses();
        },
        error: (err) => {
          console.error(err);
          alert("Failed to delete class");
        }
      });
  }

  openAddModal() {
    this.resetForm();
    this.showModal();
  }

  openEditModal(cls: any) {
    this.isEditMode = true;
    this.cls = {
      id: cls.id,
      name: cls.name,
      gradeLevel: cls.gradeLevel
    };
    this.showModal();
  }

  showModal() {
    const modal = new bootstrap.Modal(this.classModal.nativeElement);
    modal.show();
  }

  addClass() {
    if (!this.cls.name || !this.cls.gradeLevel) {
      alert('Please fill all required fields');
      return;
    }

    this.http.post(environment.baseUrl + 'Class', this.cls)
      .subscribe({
        next: () => {
          alert("Class added successfully");
          this.getClasses();
          this.closeModal();
        },
        error: (err) => {
          console.error(err);
          alert("Failed to add class");
        }
      });
  }

  updateClass() {
    const url = environment.baseUrl + `Class/${this.cls.id}`;
    const body = {
      name: this.cls.name,
      gradeLevel: this.cls.gradeLevel
    };

    this.http.put(url, body)
      .subscribe({
        next: () => {
          alert("Class updated successfully");
          this.getClasses();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error details:', err);
          alert("Failed to update class info");
        }
      });
  }

  closeModal() {
    const modal = bootstrap.Modal.getInstance(this.classModal.nativeElement);
    modal?.hide();
    this.resetForm();
  }

  resetForm() {
    this.cls = {
      id: 0,
      name: "",
      gradeLevel: ""
    };
    this.isEditMode = false;
  }
}

