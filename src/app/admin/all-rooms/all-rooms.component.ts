import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';
import { EmployeeService } from 'src/app/employee.service';
import { room } from 'src/app/models/roommodel';
import { usermodel } from 'src/app/models/usermodel';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.css']
})
export class AllRoomsComponent implements OnInit {
  rooms:room[]=[]
  user=<usermodel>{}
  roomBookingForm!: FormGroup;
  index:number=0
  constructor(private formBuilder: FormBuilder,private empservice:EmployeeService,private adminService:AdminService){}
  ngOnInit(): void {
    this.empservice.allrooms().subscribe((res)=>{
      this.rooms=res.rooms
      console.log(this.rooms)
    })
    this.roomBookingForm = this.formBuilder.group({
      roomName: ['', [Validators.required, Validators.minLength(6)]],
      roomType: ['', [Validators.required, Validators.minLength(3)]],
      access: this.formBuilder.array([],[Validators.maxLength(5)]),
      capacity: [null, [Validators.required, Validators.min(1)]]
    });
  }

  get roomName(){
    return this.roomBookingForm.get('roomName');
  }

  get roomType(){
    return this.roomBookingForm.get('roomType');
  }
  get access(){
    return this.roomBookingForm.get('access') as FormArray;
  }
  get capacity(){
    return this.roomBookingForm.get('capacity');
  }

  addAccess():void{
    this.access.push(this.formBuilder.control(''));
  }

  deleteAccess(index:number):void{
    this.access.removeAt(index);
  }


  getData(index:number){
    this.index=index
    console.log(index);
    this.roomBookingForm.patchValue({
      roomName:this.rooms[index].roomName,
      roomType:this.rooms[index].roomType,
      capacity:this.rooms[index].capacity
    })
    this.access.clear();
    for(let obj of this.rooms[index].access){
      (this.roomBookingForm.get('access') as FormArray).push(this.formBuilder.control(obj));
    }
    this.roomType?.disable();
    this.access.disable();

  }
  onSubmit(){

    console.log(this.index);
    this.access.enable();
    let roomObj=this.roomBookingForm.value;

    roomObj={
      _id:this.rooms[this.index]._id,
      room:roomObj
    }
    console.log(roomObj);

    this.adminService.editRoom(roomObj).subscribe(res=>{
      console.log(res)
    })

  }
  selectFile(event:any){


  }

}
