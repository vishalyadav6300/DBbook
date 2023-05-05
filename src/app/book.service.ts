import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { eventmodel } from './models/eventmodel';
import { room } from './models/roommodel';
import { usermodel } from './models/usermodel';
import { baseUrl,bookServiceUrls } from './route-config';
interface filterresponse{
  message:string,
  rooms:room[],
  events:eventmodel[]
}
interface eventsresponse{
  message:string,
  Events:eventmodel[]
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private hc:HttpClient) { }

  getRoomById(id:any):Observable<filterresponse>{
    return this.hc.post<filterresponse>(`${baseUrl}${bookServiceUrls.roomFilter}`,id);
  }

  getRoomEvents(roomName:string):Observable<filterresponse>{
    return this.hc.post<filterresponse>(`${baseUrl}${bookServiceUrls.roomEvents}/${roomName}`,{});
  }

  addEvents(eventObj:any):Observable<{message:string}>{
    return this.hc.post<{message:string}>(`${baseUrl}${bookServiceUrls.addEvent}`,eventObj);
  }

  getEmployeeDetails():Observable<{message:string,employees:usermodel[]}>{
    return this.hc.get<{message:string,employees:usermodel[]}>(`${baseUrl}${bookServiceUrls.allEmployee}`);
  }

  getEvents():Observable<any>{
    return this.hc.get(`${baseUrl}${bookServiceUrls.allEvents}`);
  }

}