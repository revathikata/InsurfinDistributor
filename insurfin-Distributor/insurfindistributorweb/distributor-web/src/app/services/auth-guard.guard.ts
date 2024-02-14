import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // let userRoles = JSON.parse(localStorage.getItem('userroles') ?? '[]');
      if (sessionStorage.getItem('AccessToken2')) {
        return true;
      }else {
        
        sessionStorage.removeItem('AccessToken2');
        // localStorage.removeItem('loginDetails');
        // localStorage.removeItem('getuserId');
        this.router.navigate(['login2']);
      return false;
    }
  }
  
}
