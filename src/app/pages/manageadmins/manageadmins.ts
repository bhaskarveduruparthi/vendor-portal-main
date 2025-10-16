import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { Admin, ManageAdminsService } from '../service/manageadmins.service';
import { AuthenticationService } from '../service/authentication.service';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';


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
        ReactiveFormsModule,
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
        ConfirmDialogModule,
        PasswordModule,
        MessageModule,
        
    ],
    template: `
        <p-panel>
            <p-toolbar styleClass="mb-6">
                <ng-template #start>
                  <!--<p-button label="Create Admin" icon="pi pi-plus" severity="primary" (onClick)="openAdminDialog()" />-->
                </ng-template>
                <ng-template #end>
                    <p-button label="Export to Excel" icon="pi pi-upload" severity="secondary" (onClick)="exportCSV()" />
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
                        <p-iconfield>
                            <p-inputicon styleClass="pi pi-search" />
                            <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Search..." />
                        </p-iconfield>
                    </div>
                </ng-template>
                <ng-template #header>
                    <tr>
                        <th style=" color:#F4991A; font-weight:bold">First Name</th>
                        <th style=" color:#F4991A; font-weight:bold">Last Name</th>
                        <th style="color:#F4991A; font-weight:bold">Login Id</th>
                        <th style=" color:#F4991A; font-weight:bold">Email Id</th>
                        <!--<th style=" color:#F4991A;" >Actions</th>-->
                    </tr>
                </ng-template>
                <ng-template #body let-admin>
                    <tr>
                        <td style="">{{ admin.firstname }}</td>
                        <td style="">{{ admin.lastname }}</td>
                        <td style="">{{ admin.loginid }}</td>
                        <td style="">{{ admin.email }}</td>
                        <!--<td>
                          <p-button label="Edit" class="mr-2" [rounded]="true" severity="info" [outlined]="true" />
                          <p-button label="Delete" class="mr-2" severity="danger" [rounded]="true" [outlined]="true"  />
                        </td>-->
                    </tr>
                </ng-template>
                <ng-template pTemplate="emptymessage">
      <tr>
        <td colspan="5">No Admins found.</td>
      </tr>
    </ng-template>
            </p-table>
        </p-panel>

      <p-dialog header="Create Admin" [(visible)]="adminDialog" [modal]="true" [style]="{width: '520px'}">
  <form [formGroup]="adminForm" style="padding: 8px;">
    <div style="margin-bottom:16px;">
      <label for="firstname" style="display:block;font-weight:500;margin-bottom:4px;">First Name</label>
      <input id="firstname" pInputText formControlName="firstname" style="width:100%;" />
      <p-message *ngIf="adminForm.controls['firstname'].touched && adminForm.controls['firstname'].invalid"
        severity="error" text="First name is required."></p-message>
    </div>
    <div style="margin-bottom:16px;">
      <label for="lastname" style="display:block;font-weight:500;margin-bottom:4px;">Last Name</label>
      <input id="lastname" pInputText formControlName="lastname" style="width:100%;" />
      <p-message *ngIf="adminForm.controls['lastname'].touched && adminForm.controls['lastname'].invalid"
        severity="error" text="Last name is required."></p-message>
    </div>
    <div style="margin-bottom:16px;">
      <label for="email" style="display:block;font-weight:500;margin-bottom:4px;">Email ID</label>
      <input id="email" pInputText formControlName="email" style="width:100%;" />
      <p-message *ngIf="adminForm.controls['email'].touched && adminForm.controls['email'].invalid"
        severity="error" text="Valid email is required."></p-message>
    </div>
    <div style="margin-bottom:16px;">
      <label for="loginid" style="display:block;font-weight:500;margin-bottom:4px;">Login ID</label>
      <input id="loginid" pInputText formControlName="loginid" style="width:100%;" />
      <p-message *ngIf="adminForm.controls['loginid'].touched && adminForm.controls['loginid'].invalid"
        severity="error" text="Login ID is required."></p-message>
    </div>
    <div style="margin-bottom:16px;">
      <label for="password" style="display:block;font-weight:500;margin-bottom:4px;">Password</label>
      <input id="password" pPassword formControlName="password" [feedback]="false" style="width:100%;" />
      <p-message *ngIf="adminForm.controls['password'].touched && adminForm.controls['password'].invalid"
        severity="error"
        text="Password must be at least 8 characters and include uppercase, lowercase, number, and special character."></p-message>
    </div>
    <div style="display:flex; gap: 12px; justify-content: flex-end;">
      <p-button label="Cancel" severity="secondary" (onClick)="hideAdminDialog()"></p-button>
      <p-button label="Create Admin" (onClick)="createAdmin()"></p-button>
    </div>
  </form>
</p-dialog>




    `,
    providers: [MessageService, ManageAdminsService, ConfirmationService]
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

    adminForm!: FormGroup;
    messages: any[] = [];

    constructor(
        private fb: FormBuilder,
        private manageadminservice: ManageAdminsService,
        private messageService: MessageService,
        private authservice: AuthenticationService,
        private confirmationService: ConfirmationService,
        public router: Router
    ) {
        this.authservice.user.subscribe((x) => {
            if (x?.loginid == 'SuperAdmin') {
                this.isvalid = true;
            } else {
                this.router.navigate(['/auth/access']);
            }
        });
    }

    ngOnInit() {
        this.loadDemoData();
        this.adminForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            loginid: ['', Validators.required],
            password: [
                '',
                [
                    Validators.required,
                    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)
                ]
            ]
        });
        this.messages = [];
    }

    loadDemoData() {
        this.manageadminservice.getAdmins().subscribe((data: any) => {
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

    gotoView() {
        this.router.navigate(['/app/pages/viewmanagepos']);
    }

    openAdminDialog() {
        this.adminDialog = true;
        this.adminForm.reset();
        this.messages = [];
    }

    hideAdminDialog() {
        this.adminDialog = false;
        this.adminForm.reset();
        this.messages = [];
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    createAdmin() {
        this.messages = [];
        if (this.adminForm.invalid) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Fill all the Required Fields' });
            this.adminForm.markAllAsTouched();
            return;
        }
        // Add admin logic below (e.g., call service and reload the table)
        const newAdmin: Admin = this.adminForm.value;
        console.log('Creating admin:', newAdmin);
        this.manageadminservice.createAdmin().subscribe({
            next: () => {
                this.messages.push({
                    severity: 'success',
                    summary: 'Admin Created',
                    detail: 'Admin account has been successfully added.'
                });
                this.loadDemoData();
                this.hideAdminDialog();
            },
            error: () => {
                this.messages.push({
                    severity: 'error',
                    summary: 'Creation Failed',
                    detail: 'There was an error creating the admin.'
                });
            }
        });
    }
}
