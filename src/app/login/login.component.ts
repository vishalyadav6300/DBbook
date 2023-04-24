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
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required]]
  })

  get username() {
    return this.LoginObj.get('username');
  }

  get password() {
    return this.LoginObj.get('password');
  }

  onSubmit(): void {
    console.log(this.LoginObj.value)
    this.employeeService.toLogin(this.LoginObj.value).subscribe(res => {
      console.log(res);
      if (res.message == "success") {
        this.route.navigateByUrl("user/home")
      }
      else {
        alert("invalid credantials")
      }
    })
  }
}