import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { eventmodel } from 'src/app/models/eventmodel';
import { usermodel } from 'src/app/models/usermodel';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  employeeData=<usermodel>{}
  displayDetails:boolean=true
  events:eventmodel[]=[]
  totalevents:number=0;
  numberofpages:number=0;
  limit:number=3;
  currentPage:number=1;
  constructor(private employeeService:EmployeeService){}
  ngOnInit(): void {
    this.employeeData=this.employeeService.user  
  }

  onClickDetails(){
    this.displayDetails=true
  }
  onClickEvent(){
    this.displayDetails=false;
    this.totalevents=this.employeeData.Events.length;
    this.numberofpages=Math.ceil(this.totalevents/this.limit);
    
    const pageniateObj={
      email:this.employeeData.email,
      page:1,
      limit:this.limit
    }
    this.employeeService.paginateForMyEvents(pageniateObj).subscribe(res=>{
      this.events=res.events;
    })
  }

  getEventsAccordingtoPages(page:number){
    if(page<=0){
      this.currentPage=1;
      page=1;
    }
    else if(page>this.numberofpages){
      this.currentPage=this.numberofpages;
      page=this.numberofpages
    }
    else
    this.currentPage=page;
    console.log(page);
    const pageniateObj={
      email:this.employeeData.email,
      page:page,
      limit:this.limit
    }
    this.employeeService.paginateForMyEvents(pageniateObj).subscribe(res=>{
      this.events=res.events;
    })

  }

}
