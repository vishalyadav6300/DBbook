import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: Router) { }

  LoginObj = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  get email() {
    return this.LoginObj.get('email');
  }

  get password() {
    return this.LoginObj.get('password');
  }

  onSubmit(): void {
    this.employeeService.toLogin(this.LoginObj.value).subscribe(res => {
      if (res.message == "admin logged success"){
        let adminobj=JSON.stringify(res.adminobj)
        localStorage.setItem("admin",adminobj)
        localStorage.setItem("token",res.token)
        this.employeeService.user=JSON.parse(localStorage.getItem("admin")||"")
        this.route.navigateByUrl("admin")
      }
      else {
        if(res.message=="user logged success"){
          let userobj=JSON.stringify(res.userobj)
          localStorage.setItem("user",userobj)
          localStorage.setItem("token",res.token)
          this.employeeService.user=JSON.parse(localStorage.getItem("user")||"")
          this.route.navigateByUrl("user/home")
        }
        else{
          alert(res.message)
        }
      }
    })
  }
}