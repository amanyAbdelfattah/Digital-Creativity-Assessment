import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AlertService } from 'src/services/alert.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const loggedIn = this.authService.isLoggedIn();
    console.log('Checking if user is logged in:', loggedIn);

    if (!loggedIn) {
      this.router.navigate(['login']);
      return false;
    }

    return true; // Allow access to the dashboard
  }
}
