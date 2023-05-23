import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private route: Router, private empservice: EmployeeService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token: string = localStorage.getItem("token") || ''
    if (token) {
      token = atob(token.split(".")[1])
      let tok = JSON.parse(token)
      let tokenType = tok.type
      if(tokenType=="admin"){
        this.route.navigateByUrl("/admin")
        return false
      }
      if(tokenType=="user"){
        this.route.navigateByUrl("/user")
        return false
      }
      this.route.navigateByUrl("/pagenotfound")
      return false
    }
    return true;
  }
}