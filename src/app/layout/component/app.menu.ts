import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { Admin } from '@/pages/service/manageadmins.service';
import { AuthenticationService } from '@/pages/service/authentication.service';
import { LayoutService } from '../service/layout.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];


    
        superadmin_model: any[] = [
            {
                label: 'Contents',
                items: [{ label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/app'] },
                { label: 'Manage Admins', icon: 'pi pi-users', routerLink: ['/app/pages/manageadmins'] },
                { label: 'Manage Suppliers', icon: 'pi pi-users', routerLink: ['/app/pages/managesuppliers'] },
                
                { label: 'Purchase Order', icon: 'pi pi-calendar-clock', routerLink: ['/app/pages/managepos'] },
                 { label: 'Manage Delivery Schedules', icon: 'pi pi-calendar-clock', routerLink: ['/app/pages/managedeliveryschedules'] },
                { label: 'Manage Invoice Details', icon: 'pi pi-receipt', routerLink: ['/app/pages/manageinvoices'] },
                
                
                
                { label: 'Change Password', icon: 'pi pi-key', routerLink: ['/app/pages/changepassword'] },
                { label: 'Reports', 
                    items:[{ label: 'Statement of Accounts', icon: 'pi pi-file', routerLink: ['/app/pages/statementofaccounts'] },
                          { label: 'Payment Advice', icon: 'pi pi-file', routerLink: ['/app/pages/paymentofadvice'] },
                          
                    ]
                },
            ],
                

            },
            
            
            
        ];
    
        admin_model: any[] = [
            {
                label: 'Contents',
                items: [{ label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/app'] },
               
                { label: 'Manage Suppliers', icon: 'pi pi-users', routerLink: ['/app/pages/managesuppliers'] },
                
                { label: 'Manage Scheduling Agreement', icon: 'pi pi-calendar-clock', routerLink: ['/app/pages/managepos'] },
                 { label: 'Manage Delivery Schedules', icon: 'pi pi-calendar-clock', routerLink: ['/app/pages/managedeliveryschedules'] },
                { label: 'Manage Invoice Details', icon: 'pi pi-receipt', routerLink: ['/app/pages/manageinvoices'] },
                
                
                
                { label: 'Change Password', icon: 'pi pi-key', routerLink: ['/app/pages/changepassword'] },
                { label: 'Reports', 
                    items:[{ label: 'Statement of Accounts', icon: 'pi pi-file', routerLink: ['/app/pages/statementofaccounts'] },
                          { label: 'Payment Advice', icon: 'pi pi-file', routerLink: ['/app/pages/paymentofadvice'] },
                          
                    ]
                },
            ],
                

            },
            
            
            
        ];

        supplier_model: any[] = [
            {
                label: 'Contents',
                items: [{ label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/app'] },
               
                
                
                { label: 'Manage Scheduling Agreement POs', icon: 'pi pi-calendar-clock', routerLink: ['/app/pages/managepos'] },
                { label: 'Manage Delivery Schedules', icon: 'pi pi-calendar-clock', routerLink: ['/app/pages/managedeliveryschedules'] },
                { label: 'Manage Invoice Details', icon: 'pi pi-receipt', routerLink: ['/app/pages/manageinvoices'] },
                
                
                
                { label: 'Change Password', icon: 'pi pi-key', routerLink: ['/app/pages/changepassword'] },
                { label: 'Reports', 
                    items:[{ label: 'Statement of Accounts', icon: 'pi pi-file', routerLink: ['/app/pages/statementofaccounts'] },
                          { label: 'Payment Advice', icon: 'pi pi-file', routerLink: ['/app/pages/paymentofadvice'] },
                          
                    ]
                },
            ],
                

            },
            
            
            
        ];

    user : Admin | null = {}
    constructor(public layoutService: LayoutService,private authenticationService: AuthenticationService) {
      this.authenticationService.user.subscribe((x) => {
        if(x?.loginid == 'SuperAdmin') {
          this.model = this.superadmin_model
        }
        else if(x?.loginid == 'Admin'){
            this.model = this.admin_model;
        }
        else{
            this.model = this.supplier_model;
        }
      });
    }
}
