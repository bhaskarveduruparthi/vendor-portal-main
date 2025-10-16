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
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule,InputIconModule,IconFieldModule,PanelModule, PasswordModule, ToastModule,RadioButtonModule, MessageModule, FormsModule, RouterModule, RippleModule, ],
    providers: [MessageService],
    template: `
        
        <p-toast />
        
        <div
            class="px-6 py-20 md:px-20 lg:px-80 flex items-center justify-center backdrop-blur-3xl bg-cover! bg-center! bg-no-repeat!"
            style="background: linear-gradient(259deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(9, 16, 18, 1) 100%);"
        >
            <div class="px-8 md:px-12 lg:px-20 py-12 flex flex-col items-center gap-12 w-full backdrop-blur-2xl rounded-2xl bg-white/10 border border-white/10 max-w-sm">
                <div class="flex flex-col items-center gap-4 w-full">
                    
                    <div class="flex flex-col gap-2 w-full">
                        <div class="text-center text-3xl font-medium text-white leading-tight">Supplier Portal</div>
                        <div class="text-center">
                           

                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-center gap-8 w-full">
                  
                    <div class="flex flex-col gap-6 w-full">
                      <div class="flex gap-4 mb-8">
                          <p-radioButton name="userType" value="Suppliers" [(ngModel)]="userType" inputId="suppliers"></p-radioButton>
<label for="suppliers" style="color: white;">Suppliers</label>

<p-radioButton name="userType" value="Admin" [(ngModel)]="userType" inputId="admin"></p-radioButton>
<label for="admin" style="color: white;">Admins</label>
                        </div>
                        <p-iconfield icon-position="left">
                            <p-inputicon class="pi pi-user text-white/70!"></p-inputicon>
                            <input
                                pInputText
                                type="text"
                                [(ngModel)]="loginid"
                                class="appearance-none! border! border-white/10! w-full! outline-0! bg-white/10! text-white! placeholder:text-white/70! rounded-3xl! shadow-sm!"
                                placeholder="Login Id"
                            />
                        </p-iconfield>
                        <p-iconfield icon-position="left">
                            <p-inputicon class="pi pi-lock text-white/70!"></p-inputicon>
                            <input
                                pInputText
                                type="password"
                                [(ngModel)]="password"
                                class="appearance-none! border! border-white/10! w-full! outline-0! bg-white/10! text-white! placeholder:text-white/70! rounded-3xl! shadow-sm!"
                                placeholder="Password"
                            />
                        </p-iconfield>
                    </div>
                    <button pButton class="w-full! rounded-3xl! bg-surface-950! border! border-surface-950! text-white! hover:bg-surface-950/80!" (click)="login()">
                        <span pButtonLabel>Sign In</span>
                    </button>
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
