import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, Observable, Subject, switchMap } from 'rxjs';
import { usermodel } from './models/usermodel';
import {baseUrl,adminServiceUrls} from './route-config'
interface dashboardresponse{
  message:string,
  emps:number,
  rooms:number,
  events:number
}

interface addemployeeresponse{
  message:string,
  emploee:usermodel
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private debounceSubject = new Subject<string>();

  constructor(private hc:HttpClient) { }

  todayevents():Observable<any>{
    return this.hc.get(`${baseUrl}${adminServiceUrls.todayEvents}`)
  }
  dashboard():Observable<dashboardresponse>{
    return this.hc.get<dashboardresponse>(`${baseUrl}${adminServiceUrls.dashboard}`)
  }

  addEmployee(employeeObj:Object):Observable<addemployeeresponse>{
    return this.hc.post<addemployeeresponse>(`${baseUrl}${adminServiceUrls.addEmployee}`,employeeObj);
  }

  addRoom(roomObj:Object):Observable<{message:string}>{
    return this.hc.post<{message:string}>(`${baseUrl}${adminServiceUrls.addRoom}`,roomObj);
  }

  editRoom(roomObj:Object):Observable<{message:string}>{
    return this.hc.post<{message:string}>(`${baseUrl}${adminServiceUrls.editRoom}`,roomObj);
  }


  public getDebouncedObservable(delay: number): Observable<any> {
    return this.debounceSubject.pipe(
      debounceTime(delay),
      switchMap((event) => this.getemployeeuser(event))
    );
  }

  public emitEvent(event: string): void {
    this.debounceSubject.next(event);
  }

  getemployeeuser(username:string):Observable<{message:string}>{
    return this.hc.get<{message:string}>(`${baseUrl}${adminServiceUrls.checkuser}/${username}`)
  }
}