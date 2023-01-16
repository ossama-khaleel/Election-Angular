import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(private toastr: ToastrService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(state.url.indexOf('admin'));
    const token = localStorage.getItem('token');
    if (token) {
      if (state.url.indexOf('admin') >= 0) {
        let user: any = localStorage.getItem('user');
        if (user) {
          user = JSON.parse(user);
          if (user.RoleId == 1) {
            this.toastr.success('Welcome Admin', '', { positionClass: 'toast-bottom-center' });
            return true;
          }
          else {
            this.toastr.error('UnAuthorized', '', { positionClass: 'toast-bottom-center' });
            this.router.navigate(['auth/login']);
            localStorage.clear();
            return false;
          }
        }
        else {
          this.toastr.warning('Login Please','', { positionClass: 'toast-bottom-center' });
          this.router.navigate(['auth/login']);
        }
      }
      if (state.url.indexOf('user') >= 0) {
        let user: any = localStorage.getItem('user');
        if (user) {
          user = JSON.parse(user);
          if (user.RoleId == 2) {
            this.toastr.success('Welcome user', '', { positionClass: 'toast-bottom-center' });
            return true;
          }
          else {
            this.toastr.error('UnAuthorized', '', { positionClass: 'toast-bottom-center' });
            this.router.navigate(['auth/login']);
            localStorage.clear();
            return false;
          }
        }
        else {
          this.toastr.warning('Login Please','', { positionClass: 'toast-bottom-center' });
          this.router.navigate(['auth/login']);
        }
      }
      return true;
    }
    else {
      this.router.navigate(['auth/login']);
      this.toastr.warning('Please Login', 'asd', { positionClass: 'toast-bottom-center' });
      return false;
    }
  }
}
