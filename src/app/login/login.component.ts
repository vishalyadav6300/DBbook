import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder,private employeeService:EmployeeService){}

  LoginObj=this.fb.group({
    username:['',[Validators.required,Validators.minLength(6)]],
    password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+,\-.?])(?=.{8,})[a-zA-Z0-9!@#$%^&*()_+,\-.?]+$/)]]
  })

  get username(){
    return this.LoginObj.get('username');
  }

  get password(){
    return this.LoginObj.get('password');
  }

  onSubmit():void{
    console.log(this.LoginObj.value)
    this.employeeService.toLogin(this.LoginObj.value).subscribe(res=>{
      console.log(res);
    })
  }

}
