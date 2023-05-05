import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  emps!:number
  rooms!:number
  events!:number
  todayevents:any=[]
  p:number=1

  ngOnInit(): void {
    this.adminservice.dashboard().subscribe((res)=>{
      this.emps=res.emps
      this.rooms=res.rooms
      this.events=res.events
    })

    this.adminservice.todayevents().subscribe((res)=>{
      this.todayevents=res.events
    })
  }
  constructor(private adminservice:AdminService){}

}
