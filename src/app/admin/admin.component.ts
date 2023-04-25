import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private employeeservice:EmployeeService,
    private route:Router){
  }
  
  logout(){
    localStorage.clear()
    this.employeeservice.admin_active=false
    this.route.navigateByUrl('login')
  }   
}