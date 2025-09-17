
import { Admin } from '@/pages/service/manageadmins.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@/pages/service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    user: Admin | null = {};

  constructor(private routeService: AuthenticationService, private router: Router){};
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {
    console.log('CanActivate called');

   this.routeService.user.subscribe((x)=>{
        if(x?.loginid == 'Admin' || 'SuperAdmin'){
            this.router.navigate(['/app']);
        }
        else if(x?.loginid == 'Supplier'){
          this.router.navigate(['/']);
        }
        else{
          this.router.navigate(['auth/login']);
        }
            
        
   });

   return true;
}
}