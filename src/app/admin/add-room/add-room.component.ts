import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  roomBookingForm!: FormGroup;
  file!: File

  constructor(private formBuilder: FormBuilder, private adminService: AdminService,
    private route: Router) { }
  ngOnInit(): void {
    this.roomBookingForm = this.formBuilder.group({
      roomName: ['', [Validators.required, Validators.minLength(6)]],
      roomType: ['', [Validators.required, Validators.minLength(3)]],
      access: this.formBuilder.array([this.formBuilder.control('')], [Validators.maxLength(5)]),
      capacity: [0, [Validators.required, Validators.min(1),this.positiveNumberValidator]],
      image: ['', Validators.required]
    });
  }
  get roomName() {
    return this.roomBookingForm.get('roomName');
  }
  get roomType() {
    return this.roomBookingForm.get('roomType');
  }
  get access() {
    return this.roomBookingForm.get('access') as FormArray;
  }
  get capacity() {
    return this.roomBookingForm.get('capacity');
  }
  get image() {
    return this.roomBookingForm.get('image');
  }

  selectFile(event: any) {
    this.file = event.target.files[0]
  }

  addAccess(): void {
    this.access.push(this.formBuilder.control(''));
  }

  deleteAccess(index: number): void {
    this.access.removeAt(index);
    console.log(this.capacity)
  }

//custom validator to check positive number
  positiveNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any }|null => {
      const isNotOk = Number(control.value) < 0;
      return isNotOk ? { nonPositive: { value: control.value } } : null;
    }
  }
  
  onSubmit() {
    let formData = new FormData();
    formData.append("image", this.file, this.file.name)
    formData.append('roomObj', JSON.stringify(this.roomBookingForm.value))
    console.log(formData);
    this.adminService.addRoom(formData).subscribe(res => {
      console.log(res);
      if (res.message == 'created successfully') {
        alert("added successfully")
        this.route.navigateByUrl("admin")
      }
      else {
        alert(res.message)
      }
    })
  }
}