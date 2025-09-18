import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { LoginService } from '../service/login.service';
import { MessageModule } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '@/pages/service/authentication.service';
import { ToastModule } from 'primeng/toast';
import { LayoutService } from '@/layout/service/layout.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, ToastModule,RadioButtonModule, MessageModule, FormsModule, RouterModule, RippleModule, ],
    providers: [MessageService],
    template: `
        
        <p-toast />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-screen overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome !</div>
                            
                        </div>
                        <div class="flex gap-4 mb-8">
                          <p-radioButton name="userType" value="Suppliers" [(ngModel)]="userType" inputId="suppliers"></p-radioButton>
<label for="suppliers">Suppliers</label>

<p-radioButton name="userType" value="Admin" [(ngModel)]="userType" inputId="admin"></p-radioButton>
<label for="admin">Admin</label>
                        </div>
                        <div>
                           <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Login Id</label>
                            <input pInputText id="email1" type="text" class="w-full md:w-120 mb-8" [(ngModel)]="loginid" />

                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                            <p-password id="password1" [(ngModel)]="password"  [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>

                            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                               
                                <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
                            </div>
                            <p-button label="Sign In" styleClass="w-full" (click)="login()"></p-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Login {
    loginid!: string;

    password!: string;

    checked: boolean = false;

    userType: string = 'Suppliers';

    constructor(public layoutService: LayoutService, private router: Router,
              public loginservice:LoginService ,public auth:AuthenticationService , public messageservice: MessageService) { }

    login() {
    console.log(this.userType)
    console.log(this.loginid)
    console.log(this.password)
    this.loginservice.getToken(this.loginid , this.password, this.userType)
      .subscribe((data:any)=>{
        console.log(data);
        this.auth.tokenValue = data
        
        localStorage.setItem('token' , JSON.stringify(data))
        
        this.getuser()
        this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Login Successfull' });
      },(err)=>{
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Login Unsuccessfull' });
        console.log(err.error.message)
        alert(err.error.message)
       
          
         
      })
  }  
  
  getuser() {
    this.loginservice.getUserDetails()
      .subscribe((data:any)=>{
        console.log(data);
        this.auth.userValue = data
        localStorage.setItem('user' , JSON.stringify(data))
        if(data?.loginid == 'SuperAdmin') {
          this.router.navigate(['/app/pages/manageadmins']);
        } else if (data?.loginid == 'Admin'){
          this.router.navigate(['/app']);
        }
        else{
            this.router.navigate(['/app']);
        }

      })
    
}

}
