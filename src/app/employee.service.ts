import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginModel } from 'src/models/loginModel';
import { adminmodel } from './models/adminmodel';
import { room } from './models/roommodel';
import { usermodel } from './models/usermodel';

interface responseroom{
  message:string,
  rooms:room[]
}

interface responselogin{
  message:string,
  userobj:usermodel,
  adminobj:adminmodel,
  token:string
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  user_active:boolean=false
  admin_active:boolean=false
  user=<usermodel>{}
  constructor(private hc:HttpClient) { 
    if(localStorage.getItem("user")!=null){
      this.user=JSON.parse(localStorage.getItem("user")||"")
      this.user_active=true
    }
    if(localStorage.getItem("admin")!=null){
      this.user=JSON.parse(localStorage.getItem("admin")||"")
      this.admin_active=true
    }
  }

  toLogin(loginObj:Object):Observable<responselogin>{
    return this.hc.post<responselogin>('http://localhost:3009/login',loginObj);
  }

  allrooms():Observable<responseroom>{
    return this.hc.get<responseroom>('http://localhost:3009/room/allrooms')
  }
}