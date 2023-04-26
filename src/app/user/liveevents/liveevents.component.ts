import { CalendarOptions } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book.service';

interface event {
  event_name: string,
  start_time: Date,
  end_time: Date,
  host: string,
  room: string,
  status: string,
  nvitees: string
}
interface calendarEvent{
  title:string,
  start:Date,
  end:Date,
  url:string
}


@Component({
  selector: 'app-liveevents',
  templateUrl: './liveevents.component.html',
  styleUrls: ['./liveevents.component.css']
})
export class LiveeventsComponent implements OnInit {

  events: event[] = []
  calendarevents:calendarEvent[]=[]
  calendarOptions: CalendarOptions= {
    eventClick:function(info){
      console.log(info)
      alert(info.event)
    },
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin,timeGridPlugin,listPlugin],
    themeSystem:"bootstrap5",
    nowIndicator: true,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    events:  [],
  };

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getEvents().subscribe(res => {
      this.events = res.Events;
      for(let event of this.events)
      {
        this.calendarevents.push({title:event.event_name,start:event.start_time,
          end:event.end_time,url:"/pagenotfound"})
        console.log(event.start_time)
      }
      console.log(this.calendarevents)
      this.calendarOptions.events=this.calendarevents
      this.calendarOptions.eventColor="green"
    })
  }
}