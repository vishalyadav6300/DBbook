import { Component,OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {


  roomBookingForm!: FormGroup;
  file!:File

  constructor(private formBuilder: FormBuilder,private adminService:AdminService){}
  ngOnInit(): void {
    this.roomBookingForm = this.formBuilder.group({
      roomName: ['', [Validators.required, Validators.minLength(6)]],
      roomType: ['', [Validators.required, Validators.minLength(3)]],
      access: this.formBuilder.array([this.formBuilder.control('')],[Validators.maxLength(5)]),
      capacity: [null, [Validators.required, Validators.min(1)]] ,
      image:['',Validators.required]
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
  get image(){
    return this.roomBookingForm.get('image');
  }
  // get images(){
  //   return this.imageUploadForm.get('images') as FormArray;
  // }

  selectFile(event:any){
    this.file= event.target.files[0]  
  }
  // addImage():void{
  //   this.images.push(this.formBuilder.control(''))
  // }
  addAccess():void{
    this.access.push(this.formBuilder.control(''));
  }
  

  onSubmit() {
    let formData=new FormData();
    formData.append("image",this.file,this.file.name)
    formData.append('roomObj',JSON.stringify(this.roomBookingForm.value))
    console.log(formData);
    this.adminService.addRoom(formData).subscribe(res=>{
      console.log(res);
    })
    

  }

}
