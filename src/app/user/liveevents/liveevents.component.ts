import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book.service';

interface event{
event_name:string,
start_time:Date,
end_time:Date,
host:string,
room:string,
status:string,
nvitees:string

}


@Component({
  selector: 'app-liveevents',
  templateUrl: './liveevents.component.html',
  styleUrls: ['./liveevents.component.css']
})
export class LiveeventsComponent implements OnInit {

  events:event[]=[]
  constructor(private bookService:BookService){}

  ngOnInit(): void {

    this.bookService.getEvents().subscribe(res=>{
      this.events=res.Events;
      console.log(this.events);
    })

    
  }
  
}
