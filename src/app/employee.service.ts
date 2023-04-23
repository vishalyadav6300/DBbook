import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginModel } from 'src/models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private hc:HttpClient) { }

  toLogin(loginObj:Object):Observable<any>{
    return this.hc.post('http://localhost:3005/',loginObj);
  }
}
