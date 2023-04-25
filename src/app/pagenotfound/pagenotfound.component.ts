import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent {
  constructor(private route:Router,private employeeservice:EmployeeService){}

  nav_to_home(){
    if(this.employeeservice.user_active){
      console.log("user")
      this.route.navigateByUrl("/user/home")
    }
    else{
      if(this.employeeservice.admin_active){
        console.log("hello")
        this.route.navigateByUrl("/admin")
      }
      else{
        this.route.navigateByUrl("/login")
      }
    }
  }
}