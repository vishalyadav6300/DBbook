import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { EmployeeService } from 'src/app/employee.service';
import { room } from 'src/app/models/roommodel';
interface roomtypemodel{
  roomType:string,
  rooms:room[]
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  roomTypes:roomtypemodel[]=[]
  rooms:room[]=[]

  ngOnInit(): void {
    this.empservice.allrooms().subscribe((res)=>{
      this.rooms=res.rooms
      for(let ele of this.rooms){
        let room=this.roomTypes.findIndex(obj=>obj.roomType==ele.roomType)
        if(room==-1){
          this.roomTypes.push({
            roomType:ele.roomType,
            rooms:[ele]
          })
        }
        else{
          this.roomTypes[room].rooms.push(ele)
        }
      }
    })
  }
  constructor(private empservice:EmployeeService,private router:Router){}

}