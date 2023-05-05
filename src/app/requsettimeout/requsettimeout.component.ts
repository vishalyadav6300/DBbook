import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-requsettimeout',
  templateUrl: './requsettimeout.component.html',
  styleUrls: ['./requsettimeout.component.css']
})
export class RequsettimeoutCompoent {
  constructor(private employeeservice:EmployeeService,private route:Router){}

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
