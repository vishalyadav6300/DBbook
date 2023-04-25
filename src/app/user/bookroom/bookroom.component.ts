import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/book.service';

interface employee{
  _id:string,
  employeeName:string
}
@Component({
  selector: 'app-bookroom',
  templateUrl: './bookroom.component.html',
  styleUrls: ['./bookroom.component.css']
})
export class BookroomComponent implements OnInit {
  roomId!: string;
  empObj:any;
  bookRoomForm!:FormGroup
  roomname!:string
  empoylee_name:employee[]=[]


  constructor(private route: ActivatedRoute,private formBuilder:FormBuilder,private bookSerice:BookService) { }

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.roomId);
    this.bookSerice.getRoomById({_id:this.roomId}).subscribe(res=>{
      this.roomname=res.rooms[0].roomName;
      console.log(this.roomname)
      this.bookRoomForm.patchValue({
        room:this.roomname
      })  
    })
    this.bookSerice.getEmployeeDetails().subscribe(res=>{
      this.empoylee_name=res.employees;
      console.log(this.empoylee_name)
    })
    this.empObj=JSON.parse(localStorage.getItem('active_user') || '{}')
    this.bookRoomForm=this.formBuilder.group({
      event_name:['',Validators.required,Validators.minLength(6)],
      start_time:['',[Validators.required]],
      end_time:['',[Validators.required]],
      host:[this.empObj.employeeName,[Validators.required]],
      room:[this.roomname,[Validators.required]],
      invitees:this.formBuilder.array([this.formBuilder.control('')])
    })

    this.bookRoomForm.get('host')?.disable();
    this.bookRoomForm.get('room')?.disable();
  }

  get event_name(){
    return this.bookRoomForm.get('event_name');
  }

  get start_time(){
    return this.bookRoomForm.get('start_time')
  }

  get end_time(){
    return this.bookRoomForm.get('end_time')
  }

  get host(){
    return this.bookRoomForm.get('host');
  }

  get room(){
    return this.bookRoomForm.get('room')
  }

  get invitees(){
    return this.bookRoomForm.get('invitees') as FormArray
  }

  onSubmit():void{
    this.bookRoomForm.patchValue({
      host:this.empObj._id,
      room:this.roomId
    })
    this.bookRoomForm.get('host')?.enable();
    this.bookRoomForm.get('room')?.enable();
    this.bookSerice.addEvents(this.bookRoomForm.value).subscribe(res=>{
      console.log(res);
    })
  }

}
