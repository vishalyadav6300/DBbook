import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/book.service';
import { eventmodel } from 'src/app/models/eventmodel';

@Component({
  selector: 'app-roomevents',
  templateUrl: './roomevents.component.html',
  styleUrls: ['./roomevents.component.css']
})
export class RoomeventsComponent implements OnInit {

  roomEvents:eventmodel[]=[]
  roomName:string=''

  constructor(private route: ActivatedRoute,private bookService:BookService){}
  ngOnInit(): void {
    this.roomName = this.route.snapshot.paramMap.get('room-name') || '';
    // console.log(this.roomName);
    // this.roomName='Training Room 1';
    this.bookService.getRoomEvents(this.roomName).subscribe(res=>{
      this.roomEvents=res.events
      console.log(res)
    })
  }

}
