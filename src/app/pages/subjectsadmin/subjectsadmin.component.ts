import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

declare var bootstrap: any;

@Component({
  selector: 'app-subjectsadmin',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './subjectsadmin.component.html',
  styleUrls: ['./subjectsadmin.component.css']
})
export class SubjectsadminComponent {
  @ViewChild('subjectModal') subjectModal!: ElementRef;
  
  subjects: any = [];
  sub: any = {
    id: 0,
    name: ""
  };
  isEditMode: boolean = false;
  isLoading: boolean = false;

  constructor(private http: HttpClient) {
    this.getAllSubjects();
  }

  
  getAllSubjects() {
    this.isLoading = true;
    this.http.get(environment.baseUrl + 'Subject').subscribe({
      next: (data) => {
        this.subjects = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        alert('Failed to load subjects');
      }
    });
  }

  openAddModal() {
    this.isEditMode = false;
    this.resetForm();
    this.showModal();
  }

  openEditModal(subject: any) {
    this.isEditMode = true;
    this.sub = {
      id: subject.id,
      name: subject.name
    };
    this.showModal();
  }

  showModal() {
    const modal = new bootstrap.Modal(this.subjectModal.nativeElement);
    modal.show();
  }

  
  addSubject() {
    if (!this.sub.name) {
      alert("Please enter subject name");
      return;
    }

    this.isLoading = true;
    this.http.post(environment.baseUrl + 'Subject', this.sub)
      .subscribe({
        next: (data) => {
          alert("Subject added successfully");
          this.getAllSubjects();
          this.closeModal();
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          alert("Failed to add subject");
          this.isLoading = false;
        }
      });
  }

  
  updateSubject() {
    if (!this.sub.name) {
      alert("Please enter subject name");
      return;
    }

    this.isLoading = true;
    this.http.put(`${environment.baseUrl}Subject/${this.sub.id}`, this.sub)
      .subscribe({
        next: (data) => {
          alert("Subject updated successfully");
          this.getAllSubjects();
          this.closeModal();
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          alert("Failed to update subject");
          this.isLoading = false;
        }
      });
  }

  confirmDelete(id: number) {
    if (confirm("Are you sure you want to delete this subject?")) {
      this.deleteSubject(id);
    }
  }

  deleteSubject(id: number) {
    this.isLoading = true;
    this.http.delete(`${environment.baseUrl}Subject/${id}`)
      .subscribe({
        next: (data) => {
          alert("Subject deleted successfully");
          this.getAllSubjects();
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          alert("Cannot delete subject. It may be associated with other records.");
          this.isLoading = false;
        }
      });
  }

  closeModal() {
    const modal = bootstrap.Modal.getInstance(this.subjectModal.nativeElement);
    modal?.hide();
    this.resetForm();
  }

  resetForm() {
    this.sub = {
      id: 0,
      name: ""
    };
    this.isEditMode = false;
  }
}