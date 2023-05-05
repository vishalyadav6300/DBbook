import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employee.service';
import { room } from 'src/app/models/roommodel';
import { usermodel } from 'src/app/models/usermodel';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit{

  rooms:room[]=[]
  user=<usermodel>{}
  @Input() public iteam_search:string="";
  p:number=1
  isLoading = true;
  ngOnInit(): void {
    this.user=this.empservice.user
    this.empservice.allrooms().subscribe((res)=>{
      this.rooms=res.rooms
      this.isLoading=false
      console.log(this.rooms)
    })
  }
  constructor(private empservice:EmployeeService){
    
  }

}