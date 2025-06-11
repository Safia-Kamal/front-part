🎓 School Management System - Angular Frontend

🚀 A modern, responsive web application for managing school-related operations, built using **Angular**.  
Supports multiple user roles: **Admin**, **Teacher**, **Student**, and **Parent** with tailored dashboards and features.
🔗 [View the API Repository](https://github.com/Safia-Kamal/SchoolManagementSystemAPIs.git)

---

🔹 Overview

This is the frontend for the School Management System, built with Angular.  
It interacts with a secure ASP.NET Core backend API to handle data operations such as class schedules, attendance, grades, authentication, and more.


✅ Features

- Authentication – Secure login system with JWT.
- Teacher Dashboard – View schedule, mark attendance, manage grades.
- Student Dashboard – View timetable, progress, and attendance.
- Parent View – Monitor child’s grades and attendance.
- Admin Panel – Manage users, classes, schedules, and subjects.
- Timetable View – Dynamic class schedules per role.
- Progress & Reports – Visualize student progress.
- Role-based UI – Each role gets a custom interface.

---

💻 Technology Stack

- Framework: Angular 19
- Language: TypeScript
- Styling: CSS / SCSS / Bootstrap
- State Management: Built-in Services
- Routing: Angular Router
- API Integration: HttpClient with JWT Interceptors

---

🗂️ Project Structure
/src
/app
/pages → Role-based components (Student, Teacher, Admin, etc.)
/services → API services
/guard → Auth guards for routes
/constant → Shared constants
/app.routes.ts → Routing setu

Setup & Run Locally

1️⃣ Clone the Repository:
git clone https://github.com/Safia-Kamal/SchoolManagementSystemUI.git
then open it using VS code

2️⃣ Install dependencies:
npm install
3️⃣ Run the development server:
ng serve

Authentication Flow
. User logs in via /login
. JWT stored in localStorage
. Interceptor attaches token to all API requests

