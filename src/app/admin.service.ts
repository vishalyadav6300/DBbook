import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private hc:HttpClient) { }

  addEmployee(employeeObj:Object):Observable<any>{
    return this.hc.post('http://localhost:3009/employee/add-employee',employeeObj);
  }

  addRoom(roomObj:Object):Observable<any>{
    return this.hc.post('http://localhost:3009/room/add-room',roomObj);
  }
}
