import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { room } from 'src/app/models/roommodel';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit{

  rooms:room[]=[]
  ngOnInit(): void {
    this.empservice.allrooms().subscribe((res)=>{
      this.rooms=res.rooms
      console.log(this.rooms)
    })
  }
  constructor(private empservice:EmployeeService){}

}
