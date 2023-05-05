import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { LoginGuard } from './login.guard';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RequsettimeoutCompoent } from './requsettimeout/requsettimeout.component';
import { UserGuard } from './user.guard';

const routes: Routes = [
  { path: 'admin', canActivate: [AdminGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'user', canActivate: [UserGuard], loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
  { path: 'pagenotfound', component: PagenotfoundComponent },
  { path: 'requesttimeout', component: RequsettimeoutCompoent },
  { path: "", pathMatch: 'full', redirectTo: "/login" },
  { path: "**", pathMatch: 'full', redirectTo: "/pagenotfound" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }