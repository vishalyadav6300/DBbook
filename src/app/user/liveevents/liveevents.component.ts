import { Component } from '@angular/core';
import {CalendarOptions} from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-liveevents',
  templateUrl: './liveevents.component.html',
  styleUrls: ['./liveevents.component.css']
})
export class LiveeventsComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay' // user can switch between the two
    },
    events: [
      { title: 'event 1', start: '2023-04-25T14:30:00',end:'2023-04-26T15:30:00',url:"/pagenotfound"},
      { title: 'event 2', date: '2023-04-02' }
    ]
  };
}
