import { CalendarOptions } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth'
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book.service';
import { Router } from '@angular/router';

interface event {
  _id:string,
  event_name: string,
  start_time: Date,
  end_time: Date,
  host: string,
  room: string,
  status: string,
  invitees: string
}
interface calendarEvent{
  id:string,
  title:string,
  start:Date,
  end:Date
}


@Component({
  selector: 'app-liveevents',
  templateUrl: './liveevents.component.html',
  styleUrls: ['./liveevents.component.css']
})
export class LiveeventsComponent implements OnInit {
  constructor(private bookService: BookService,public route:Router) { }
  events: event[] = []
  id:string=""
  title:String=""
  calendarevents:calendarEvent[]=[]
  calendarOptions: CalendarOptions= {
    eventClick:function(info){
      console.log(info.event)
    },
    initialView: 'multiMonthYear',
    plugins: [dayGridPlugin,timeGridPlugin,listPlugin,multiMonthPlugin],
    themeSystem:"bootstrap5",
    nowIndicator: true,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    events:  [],
  };
  

  ngOnInit(): void {
    this.bookService.getEvents().subscribe(res => {
      this.events = res.Events;
      for(let event of this.events)
      {
        this.calendarevents.push({id:event._id,title:event.event_name,start:event.start_time,
          end:event.end_time})
      }
      this.calendarOptions.events=this.calendarevents
      this.calendarOptions.eventColor="green"
    })
  }
}