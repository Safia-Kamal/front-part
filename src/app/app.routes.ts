import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guard/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { StudentadminComponent } from './pages/studentadmin/studentadmin.component';
import { TeacheradminComponent } from './pages/teacheradmin/teacheradmin.component';
import { ScheduleadminComponent } from './pages/scheduleadmin/scheduleadmin.component';
import { SubjectsadminComponent } from './pages/subjectsadmin/subjectsadmin.component';
import { ClassesadminComponent } from './pages/classesadmin/classesadmin.component';
import { StudentdashboardComponent } from './pages/Student/studentdashboard/studentdashboard.component';
import { StudentlayoutComponent } from './pages/Student/studentlayout/studentlayout.component';
import { StudentprogressComponent } from './pages/Student/studentprogress/studentprogress.component';
import { StudentscheduleComponent } from './pages/Student/studentschedule/studentschedule.component';
import { TeacherlayoutComponent } from './pages/Teacher/teacherlayout/teacherlayout.component';
import { TeacherdashboardComponent } from './pages/Teacher/teacherdashboard/teacherdashboard.component';
import { TeacherscheduleComponent } from './pages/Teacher/teacherschedule/teacherschedule.component';
import { TeachergradesComponent } from './pages/Teacher/teachergrades/teachergrades.component';
import { TeacherattendanceComponent } from './pages/Teacher/teacherattendance/teacherattendance.component';

export const routes: Routes = [
    {path:'', redirectTo:'login',pathMatch:'full'},

    {path:'login', component:LoginComponent},

    {path:'register', component:RegisterComponent },

    {path:'', component:LayoutComponent,
        children:[
            {path:'dashboard', component:DashboardComponent // ,canActivate:[authGuard]
            },
            {path:'studentadmin' , component:StudentadminComponent},
            {path:'teacheradmin' , component:TeacheradminComponent},
            {path:'scheduleadmin' , component:ScheduleadminComponent},
            {path:'classesadmin' , component:ClassesadminComponent},
            {path:'subjectsadmin' , component:SubjectsadminComponent},
        ]
    },
        {path:'student',  component:StudentlayoutComponent,
        children:[
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
            {path:'dashboard' , component:StudentdashboardComponent},
            {path:'studentprogress' , component:StudentprogressComponent},
            {path:'studentschedule' , component:StudentscheduleComponent}

        ]
    }, 

    {path:'teacher' , component:TeacherlayoutComponent,
        children:[
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
            {path:'dashboard' , component:TeacherdashboardComponent},
            {path:'teacherschedule' , component:TeacherscheduleComponent},
            {path:'teachergrades' , component:TeachergradesComponent},
            {path:'teacherattendance' , component:TeacherattendanceComponent},

        ]
    }
];


//   {
//     path: '',
//     component: LayoutComponent,
//     canActivate: [authGuard],
//     data: { expectedRole: 'Admin' },
//     children: [
//       { path: 'dashboard', component: DashboardComponent },
//       { path: 'studentadmin', component: StudentadminComponent },
//       { path: 'teacheradmin', component: TeacheradminComponent },
//       { path: 'scheduleadmin', component: ScheduleadminComponent },
//       { path: 'classesadmin', component: ClassesadminComponent },
//       { path: 'subjectsadmin', component: SubjectsadminComponent },
//     ]
//   },

//   {
//     path: 'student',
//     canActivate: [authGuard],
//     data: { expectedRole: 'Student' },
//     loadComponent: () => import('./pages/Student/studentlayout/studentlayout.component').then(m => m.StudentlayoutComponent),
//     children: [
//       { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//       { path: 'dashboard', loadComponent: () => import('./pages/Student/studentdashboard/studentdashboard.component').then(m => m.StudentdashboardComponent) },
//       { path: 'studentprogress', loadComponent: () => import('./pages/Student/studentprogress/studentprogress.component').then(m => m.StudentprogressComponent) },
//       { path: 'studentschedule', loadComponent: () => import('./pages/Student/studentschedule/studentschedule.component').then(m => m.StudentscheduleComponent) }
//     ]
//   },

//   {
//     path: 'teacher',
//     canActivate: [authGuard],
//     data: { expectedRole: 'Teacher' },
//     loadComponent: () => import('./pages/Teacher/teacherlayout/teacherlayout.component').then(m => m.TeacherlayoutComponent),
//     children: [
//       { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
//       { path: 'dashboard', loadComponent: () => import('./pages/Teacher/teacherdashboard/teacherdashboard.component').then(m => m.TeacherdashboardComponent) },
//       { path: 'teacherschedule', loadComponent: () => import('./pages/Teacher/teacherschedule/teacherschedule.component').then(m => m.TeacherscheduleComponent) },
//       { path: 'teachergrades', loadComponent: () => import('./pages/Teacher/teachergrades/teachergrades.component').then(m => m.TeachergradesComponent) },
//       { path: 'teacherattendance', loadComponent: () => import('./pages/Teacher/teacherattendance/teacherattendance.component').then(m => m.TeacherattendanceComponent) }
//     ]
//   }
// ];
