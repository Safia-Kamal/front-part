import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  RegisterObj:any={
    username:"",
    email:"",
    password:"",
    repeatPassword:"",
    phone:"",
    nationalId:"",
    role:""
  };
   http =inject(HttpClient);
  constructor(private router:Router){

  }
  OnRegister(){
    this.RegisterObj.role = Number(this.RegisterObj.role);
    // console.log(this.RegisterObj);
    this.http.post("https://localhost:7092/api/Account/Register", this.RegisterObj)
    .subscribe(
      (res:any)=>{
      // debugger;
        if(res.userId){
          alert("Register Success");
          localStorage.setItem("angRegister",this.RegisterObj.User);
          this.router.navigateByUrl("dashboard")
        }else{
          alert("Register Fail, Please Try again");
        }
      }
    );
  }

  

}
