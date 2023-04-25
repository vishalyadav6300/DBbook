import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})

export class UserComponent implements OnInit{

  image:string=""
  ngOnInit(): void {
    this.image=this.employeeservice.user.profilePic
  }
  constructor(private employeeservice:EmployeeService,
    private route:Router){}

    
  logout():void{
    localStorage.clear()
    this.employeeservice.user_active=false
    this.route.navigateByUrl('login')
  }
}