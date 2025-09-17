import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '@/pages/service/authentication.service';
import { Admin } from '@/pages/service/manageadmins.service';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
    user?: Admin | null;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.authenticationService.logout();
  }
}
