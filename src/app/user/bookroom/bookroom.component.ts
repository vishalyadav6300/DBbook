import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BookService } from 'src/app/book.service';

interface employee {
  _id: string,
  employeeName: string
}
interface invitesmodel {
  item_id: string,
  item_text: string
}
@Component({
  selector: 'app-bookroom',
  templateUrl: './bookroom.component.html',
  styleUrls: ['./bookroom.component.css']
})
export class BookroomComponent implements OnInit {

  selection_data: boolean = false
  roomId!: string;
  empObj: any;
  bookRoomForm!: FormGroup
  roomname!: string
  empoylee_name: employee[] = []
  invites: invitesmodel[] = [];
  invites_data: string[] = [];
  dropdownSettingsforgenre: IDropdownSettings = {};


  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private bookSerice: BookService,
    private router:Router) { }

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id') || '';

    console.log(this.roomId);

    this.bookSerice.getRoomById({ _id: this.roomId }).subscribe(res => {
      this.roomname = res.rooms[0].roomName;
      console.log(this.roomname)
      this.bookRoomForm.patchValue({
        room: this.roomname
      })
    })

    this.bookSerice.getEmployeeDetails().subscribe(res => {
      this.empoylee_name = res.employees;
      for (let ele of this.empoylee_name) {
        this.invites.push({
          item_id: ele._id,
          item_text: ele.employeeName
        })
      }
      this.selection_data = true
    })

    //Form Group
    this.empObj = JSON.parse(localStorage.getItem('user') || '{}')
    this.bookRoomForm = this.formBuilder.group({
      event_name: ['', Validators.required, Validators.minLength(6)],
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]],
      host: [this.empObj.employeeName, [Validators.required]],
      room: [this.roomname, [Validators.required]],
      invitees: this.formBuilder.array([this.formBuilder.control('')])
    })

    this.bookRoomForm.get('host')?.disable();
    this.bookRoomForm.get('room')?.disable();

    this.dropdownSettingsforgenre = {
      idField: 'item_id',
      textField: 'item_text',
      allowSearchFilter: true
    };
  }

  get event_name() {
    return this.bookRoomForm.get('event_name');
  }

  get start_time() {
    return this.bookRoomForm.get('start_time')
  }

  get end_time() {
    return this.bookRoomForm.get('end_time')
  }

  get host() {
    return this.bookRoomForm.get('host');
  }

  get room() {
    return this.bookRoomForm.get('room')
  }

  get invitees() {
    return this.bookRoomForm.get('invitees') as FormArray
  }

  onSubmit(): void {
    this.bookRoomForm.patchValue({
      host: this.empObj._id,
      room: this.roomId
    })
    this.bookRoomForm.get('host')?.enable();
    this.bookRoomForm.get('room')?.enable();
    this.bookRoomForm.value.invitees = this.invites_data
    this.bookSerice.addEvents(this.bookRoomForm.value).subscribe(res => {
      if (res.message == 'New event added:') {
        alert("added successfully")
        this.router.navigateByUrl("user")
      }
      alert(res.message);
    })
  }


  onItemSelect(data: any) {
    this.invites_data.push(data.item_id)
  }
  onItemallselect(data: any) {
    this.invites_data = []
    for (let ele of data) {
      this.invites_data.push(ele.item_id)
    }
  }
  onItemdeselect(data: any) {
    this.invites_data.splice(this.invites_data.indexOf(data.item_id), 1)
  }
  onItemdeselectall(data: any) {
    this.invites_data = []
  }

}