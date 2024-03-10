
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { DataService } from './data.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public dataService: DataService, public router: Router) { }

  canActivate(): boolean {
    // return true if authenticated else redirect to login page

    let isAuthenticated: boolean = false;

    this.dataService.getAuthStatus().subscribe((status: boolean) => {
      isAuthenticated = status;
    }, (error: any) => {
      console.error('Error checking authentication:', error);
      isAuthenticated = false;
    });
    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Redirect to error page in case of an error
    }
    return isAuthenticated;
  }

}

