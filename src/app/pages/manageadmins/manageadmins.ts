import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { Router, RouterModule } from '@angular/router';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Admin,ManageAdminsService } from '../service/manageadmins.service';
import { AuthenticationService } from '../service/authentication.service';
import { PanelModule } from 'primeng/panel';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-manageadmins',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        RouterModule,
        ToolbarModule,
        RatingModule,
        PanelModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule
    ],
    template: `
        <p-panel>
            <p-toolbar styleClass="mb-6">
            <ng-template #start>
              <p-iconfield>
                        <p-inputicon styleClass="pi pi-search" />
                        <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Search..." />
                    </p-iconfield>
            </ng-template>

            <ng-template #end>
                <p-button label="Export to Excel"  icon="pi pi-upload" severity="secondary" (onClick)="exportCSV()" />
            </ng-template>
        </p-toolbar>

        <p-table
            #dt
            [value]="admins()"
            [rows]="10"
            [columns]="cols"
            [paginator]="true"
            [globalFilterFields]="['firstname','lastname', 'loginid', 'email',]"
            [tableStyle]="{ 'min-width': '75rem' }"
            [(selection)]="selectedadmins"
            [rowHover]="true"
            dataKey="id"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Admins"
            [showCurrentPageReport]="true"
            [rowsPerPageOptions]="[10, 20, 30]"
        >
            <ng-template #caption>
                <div class="flex items-center justify-between">
                    <h5 class="m-0">Manage Admins</h5>
                     
                    
                </div>
            </ng-template>
            <ng-template #header>
                <tr>
                    
                    
                    <th pSortableColumn="firstname" style="min-width:16rem">
                        Firstname
                        <p-sortIcon field="firstname" />
                    </th>
                    
                    <th pSortableColumn="lastname" style="min-width: 8rem">
                        Last Name
                        <p-sortIcon field="lastname" />
                    </th>
                    <th pSortableColumn="loginid" style="min-width:10rem">
                        Login Id
                        <p-sortIcon field="loginid" />
                    </th>
                    <th pSortableColumn="email"   style="min-width: 12rem">
                        Email Id
                        <p-sortIcon field="email" />
                    </th>
                    
                    
                </tr>
            </ng-template>
            <ng-template #body let-admin>
                <tr>
                    
                     
                    <td style="min-width: 12rem">{{ admin.firstname }}</td>
                    <td style="min-width: 16rem">{{ admin.lastname }}</td>
                    <td style="min-width: 16rem">{{ admin.loginid }}</td>
                    <td style="min-width: 16rem">{{ admin.email }}</td>
                   
                   
                    
                    
                </tr>
            </ng-template>
        </p-table>

        </p-panel>
        

       

        
    `,
    providers: [MessageService,ManageAdminsService,  ConfirmationService]
})
export class ManageAdmins implements OnInit {
    adminDialog: boolean = false;

    admins = signal<Admin[]>([]);

    admin!: Admin;

    selectedadmins!: Admin[] | null;

    submitted: boolean = false;

    

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    isvalid: boolean = false;

    cols!: Column[];

    constructor(
        private manageadminservice: ManageAdminsService,
        private messageService: MessageService,
        private authservice: AuthenticationService,
        private confirmationService: ConfirmationService,
        public router: Router
    ) {

    this.authservice.user.subscribe((x)=>{
      if(x?.loginid =='SuperAdmin'){
        this.isvalid = true
      }
      else{
        this.router.navigate(['/auth/access']);
      }
      
      
      
    })
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.loadDemoData();
    }

    loadDemoData() {
       this.manageadminservice.getAdmins().subscribe((data:any) => {
            this.admins.set(data);
        });

        

        this.cols = [
            { field: 'firstname', header: 'First Name', customExportHeader: 'First Name' },
            { field: 'lastname', header: 'Last Name' },
            { field: 'loginid', header: 'Login Id' },
            { field: 'email', header: 'Email' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    gotoView(){
        this.router.navigate(['/app/pages/viewmanagepos'])    }    

    

    

    
}
