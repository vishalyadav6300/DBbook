import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private hc:HttpClient) { }

  getRoomById(id:any):Observable<any>{
    return this.hc.post('http://localhost:3009/room/filter',id);
  }

  addEvents(eventObj:any):Observable<any>{
    console.log(eventObj);
    return this.hc.post('http://localhost:3009/event/add-event',eventObj);
  }

  getEmployeeDetails():Observable<any>{
    return this.hc.get('http://localhost:3009/employee/all-employee');
  }

  getEvents():Observable<any>{
    return this.hc.get('http://localhost:3009/event/all-events');
  }

}
