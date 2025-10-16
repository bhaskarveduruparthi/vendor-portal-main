import { LoginService } from './../../pages/service/login.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { AuthenticationService } from '@/pages/service/authentication.service';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Menu } from 'primeng/menu';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-topbar',
  standalone: true,
  providers: [MessageService],
  imports: [
    RouterModule,
    CommonModule,
    StyleClassModule,
    AppConfigurator,
    DialogModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    
    Menu,
    Toast
],
  template: `
    <p-toast/>
    <div class="layout-topbar">
      <div class="layout-topbar-logo-container">
        <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
          <i class="pi pi-bars"></i>
        </button>
        <a class="layout-topbar-logo" routerLink="/app">
          <span><strong>Supplier Portal</strong></span>
        </a>
      </div>

      <div class="layout-topbar-actions">
        <div class="layout-config-menu">
          <!--<button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
            <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
          </button>-->
          <div class="relative">
            <button
              class="layout-topbar-action layout-topbar-action-highlight"
              pStyleClass="@next"
              enterFromClass="hidden"
              enterActiveClass="animate-scalein"
              leaveToClass="hidden"
              leaveActiveClass="animate-fadeout"
              [hideOnOutsideClick]="true"
            >
              <i class="pi pi-palette"></i>
            </button>
            <app-configurator />
          </div>
        </div>

        <button
          class="layout-topbar-menu-button layout-topbar-action"
          pStyleClass="@next"
          enterFromClass="hidden"
          enterActiveClass="animate-scalein"
          leaveToClass="hidden"
          leaveActiveClass="animate-fadeout"
          [hideOnOutsideClick]="true"
        >
          <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu hidden lg:block">
          <div class="layout-topbar-menu-content">
            <!--<button type="button" class="layout-topbar-action" (click)="changeUser_Password()">
              <i class="pi pi-key"></i>
              <span>Change Password</span>
            </button>
            <button type="button" class="layout-topbar-action" (click)="togglelogout()">
              <i class="pi pi-user"></i>
              <span>Profile</span>
            </button>-->
            
    <p-menu #menu [model]="items" [popup]="true" />
    <button  type="button" class="layout-topbar-action"  (click)="menu.toggle($event)">
      <i class="pi pi-cog"></i>
      <span>Profile Menu</span>

    </button>

          </div>
        </div>
      </div>
    </div>

    <p-dialog [(visible)]="changePasswordDialog" [style]="{width: '450px'}" header="Change Password" [modal]="true" class="p-fluid">
      <ng-template pTemplate="content">
        <div class="flex flex-column align-items-center justify-content-center">
          <div>
            <label for="oldPassword" class="block text-900 text-xl font-medium mb-2">Old Password</label>
            <p-password
              id="oldPassword"
              [(ngModel)]="old_password"
              [feedback]="false"
              placeholder="Enter Old Password"
              [toggleMask]="true"
              styleClass="mb-5"
              inputStyleClass="w-full p-3 md:w-30rem"
            ></p-password>

            <label for="newPassword" class="block text-900 font-medium text-xl mb-2">New Password</label>
            <p-password
              id="newPassword"
              [(ngModel)]="new_password"
              [feedback]="false"
              placeholder="Enter New Password"
              [toggleMask]="true"
              styleClass="mb-5"
              inputStyleClass="w-full p-3 md:w-30rem"
            ></p-password>
            <small *ngIf="new_password && !isPasswordValid()" class="p-error" style="color:red">
              Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
            </small>

            <label for="confirmPassword" class="block text-900 font-medium text-xl mb-2">Confirm Password</label>
            <p-password
              id="confirmPassword"
              [(ngModel)]="retype_password"
              [feedback]="false"
              placeholder="Confirm New Password"
              [toggleMask]="true"
              styleClass="mb-5"
              inputStyleClass="w-full p-3 md:w-30rem"
            ></p-password>
            <small *ngIf="retype_password && !doPasswordsMatch()" class="p-error" style="color:red">
              Passwords do not match.
            </small>
          </div>
        </div>
      </ng-template>
      <ng-template pTemplate="footer">
        <p-button type="button" icon="pi pi-times" (click)="hideDialog()" label="Cancel"></p-button>
        <p-button type="button" icon="pi pi-check" label="Confirm" (click)="confirmChangePassword(old_password,new_password,retype_password)"  [disabled]="!isFormValid()"></p-button>
      </ng-template>
    </p-dialog>

    <p-dialog [(visible)]="logoutdialog" header="Confirm" [modal]="true" [style]="{ width: '450px' }">
      <div class="flex align-items-center justify-content-center">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"></i>
        <span>Are you sure you want to <b>Logout</b>?</span>
      </div>
      <ng-template pTemplate="footer">
        <p-button pButton pRipple icon="pi pi-times" class="p-button-text" label="No" (click)="hidelogout()"></p-button>
        <p-button pButton pRipple icon="pi pi-check" class="p-button-text" label="Yes" (click)="logout()"></p-button>
      </ng-template>
    </p-dialog>
  `,
})
export class AppTopbar implements OnInit {
  old_password: string = '';
  new_password: string = '';
  retype_password: string = '';
  changePasswordDialog: boolean = false;
  logoutdialog: boolean = false;

  items: MenuItem[] | undefined;

  constructor(public layoutService: LayoutService,public messageservice: MessageService, private authservice: AuthenticationService, private loginservice: LoginService) {}

  ngOnInit(): void {
   const darkTheme = JSON.parse(localStorage.getItem('darkTheme') ?? 'false');
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme,
    }));

    this.initializeMenuItems(darkTheme);
  }

    initializeMenuItems(isDarkMode: boolean) {
    this.items = [
      {
        label: 'Settings',
        items: [
          {
            label: isDarkMode ? 'Turn Dark Mode Off' : 'Turn Dark Mode On',
            icon: 'pi pi-moon',
            command: () => this.toggleDarkMode(),
          },
          {
            label: 'Change Password',
            icon: 'pi pi-key',
            command: () => this.changeUser_Password(),
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => this.togglelogout(),
          },
        ],
      },
    ];
  }
  


 toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => {
      const newDarkTheme = !state.darkTheme;
      localStorage.setItem('darkTheme', JSON.stringify(newDarkTheme));
      this.initializeMenuItems(newDarkTheme); // update menu label on theme change
      return { ...state, darkTheme: newDarkTheme };
    });
  }

  isPasswordValid(): boolean {
    const password = this.new_password;
    const lengthCheck = password.length >= 8;
    const upperCaseCheck = /[A-Z]/.test(password);
    const lowerCaseCheck = /[a-z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return lengthCheck && upperCaseCheck && lowerCaseCheck && numberCheck && specialCharCheck;
  }

  doPasswordsMatch(): boolean {
    return this.new_password === this.retype_password;
  }

  isFormValid(): boolean {
    return this.isPasswordValid() && this.doPasswordsMatch() && this.old_password.length > 0;
  }

  hideDialog() {
    this.changePasswordDialog = false;
    this.old_password = '';
    this.new_password = '';
    this.retype_password = '';
  }

  changeUser_Password() {
    this.changePasswordDialog = true;
  }

  confirmChangePassword(old_password:string, new_password:string, retype_password:string) {
    if (this.isFormValid()) {
      this.loginservice.changePassword(this.old_password, this.new_password, this.retype_password).subscribe((data:any)=>{
        this.messageservice.add({ severity: 'success', summary: 'Success', detail: 'Password Updated Successfully' });
        this.changePasswordDialog = false;
      },(err)=>{
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: 'Error Changing Password' });
      });
    }
  }

  togglelogout() {
    this.logoutdialog = true;
  }

  hidelogout() {
    this.logoutdialog = false;
  }

  logout() {
    this.authservice.logout();
  }
}
