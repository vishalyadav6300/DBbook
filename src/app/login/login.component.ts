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
      if (res.message == "success"){
        localStorage.setItem("active_user",JSON.stringify(res.user));
        this.route.navigateByUrl("user/home")
      }
      else {
        alert("invalid credantials")
      }
    })
  }
}