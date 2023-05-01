import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private hc:HttpClient) { }

  todayevents():Observable<any>{
    return this.hc.get('http://localhost:3009/admin/todayevents')
  }
  dashboard():Observable<any>{
    return this.hc.get('http://localhost:3009/admin/dashboard')
  }

  addEmployee(employeeObj:Object):Observable<any>{
    return this.hc.post('http://localhost:3009/employee/add-employee',employeeObj);
  }

  addRoom(roomObj:Object):Observable<any>{
    return this.hc.post('http://localhost:3009/room/add-room',roomObj);
  }

  editRoom(roomObj:Object):Observable<any>{
    return this.hc.post('http://localhost:3009/room/edit-room',roomObj);
  }
  
}