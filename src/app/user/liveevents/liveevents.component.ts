import { CalendarOptions } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth'
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book.service';
import { Router } from '@angular/router';
import { usermodel } from 'src/app/models/usermodel';

interface event {
  _id: string,
  event_name: string,
  start_time: Date,
  end_time: Date,
  host: usermodel,
  room: string,
  status: string,
  invitees: string
}

interface calendarEvent {
  id: string,
  title: string,
  start: Date,
  end: Date,
  host:string
}

interface eventmodeler{
  title:String,
  start:Date,
  end:Date,
  host:string
}

@Component({
  selector: 'app-liveevents',
  templateUrl: './liveevents.component.html',
  styleUrls: ['./liveevents.component.css']
})

export class LiveeventsComponent implements OnInit {
  constructor(private bookService: BookService, public route: Router) { }
  
  modelevent=<eventmodeler>{}
  events: event[] = []
  id: string = ""
  title: String = ""
  calendarevents: calendarEvent[] = []
  openmodel=false
  calendarOptions: CalendarOptions = {
    eventClick: this.check.bind(this),
    initialView: 'multiMonthYear',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, multiMonthPlugin],
    themeSystem: "bootstrap5",
    nowIndicator: true,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    events:[]
  };

  check(event: any) {
    console.log(event.event)
    this.modelevent.title=event.event.title
    this.modelevent.start=event.event.start
    this.modelevent.end=event.event.end
    this.modelevent.host=event.event.host
    this.openmodel=true
  }

  closemodel(){
    this.openmodel=false
  }

  ngOnInit(): void {
    this.bookService.getEvents().subscribe(res => {
      this.events = res.Events;
      for (let event of this.events) {
        this.calendarevents.push({
          id: event._id, title: event.event_name, start: event.start_time,
          end: event.end_time,
          host:event.host.employeeName
        })
      }
      this.calendarOptions.events = this.calendarevents
      this.calendarOptions.eventColor = "green"
    })
  }
}