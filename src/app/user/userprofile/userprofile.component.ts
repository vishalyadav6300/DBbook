import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { usermodel } from 'src/app/models/usermodel';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  employeeData=<usermodel>{}
  displayDetails:boolean=true
  constructor(private employeeService:EmployeeService){}
  ngOnInit(): void {
    this.employeeData=this.employeeService.user  
  }

  onClickDetails(){
    this.displayDetails=true
  }
  onClickEvent(){
    this.displayDetails=false
  }

}
