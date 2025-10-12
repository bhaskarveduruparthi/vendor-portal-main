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
import { PanelModule } from 'primeng/panel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Supplier, ManageSuppliersService } from '../service/managesuppliers.service';
import { AuthenticationService } from '../service/authentication.service';

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
    selector: 'app-managesuppliers',
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
        InputTextModule,
        TextareaModule,
        PanelModule,
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
                        <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Search Supplier Data" />
                    </p-iconfield>
            </ng-template>

            <ng-template #end>
                <p-button label="Export to Excel"  icon="pi pi-upload" severity="secondary" (onClick)="exportCSV()" />
            </ng-template>
        </p-toolbar>

        <p-table
            #dt
            [value]="suppliers()"
            [rows]="10"
            [columns]="cols"
            [paginator]="true"
            [globalFilterFields]="['suppliercode','suppliername', 'loginid', 'email','city', 'contact_person', 'landline_number', 'mobile_number']"
            [tableStyle]="{ 'min-width': '75rem' }"
            [(selection)]="selectedsuppliers"
            [rowHover]="true"
            dataKey="id"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Suppliers"
            [showCurrentPageReport]="true"
            [rowsPerPageOptions]="[10, 20, 30]"
        >
            <ng-template #caption>
                <div class="flex items-center justify-between">
                    <h5 class="m-0">Manage Suppliers</h5>
                     
                    
                </div>
            </ng-template>
            <ng-template #header>
                <tr>
                    
                    
                    <th pSortableColumn="suppliercode" style="min-width:16rem">
                        Supplier Code
                        <p-sortIcon field="suppliercode" />
                    </th>
                    
                    <th pSortableColumn="suppliername" style="min-width: 8rem">
                        Supplier Name
                        <p-sortIcon field="suppliername" />
                    </th>
                    <th pSortableColumn="city" style="min-width:10rem">
                        City
                        <p-sortIcon field="city" />
                    </th>
                   
                    <th pSortableColumn="email"   style="min-width: 12rem">
                        Email Id
                        <p-sortIcon field="email" />
                    </th>
                    <th pSortableColumn="contact_person"   style="min-width: 12rem">
                       Contact Person
                        <p-sortIcon field="contact_person" />
                    </th>
                     <th pSortableColumn="loginid"   style="min-width: 12rem">
                       Login Id
                        <p-sortIcon field="loginid" />
                    </th>
                     <th pSortableColumn="landline_number"   style="min-width: 12rem">
                      Land Line Number
                        <p-sortIcon field="landline_number" />
                    </th>
                    <th pSortableColumn="mobile_number"   style="min-width: 12rem">
                      Mobile Number
                        <p-sortIcon field="mobile_number" />
                    </th>
                    
                    
                </tr>
            </ng-template>
            <ng-template #body let-supplier>
                <tr>
                    
                    
                    <td style="min-width: 12rem">{{ supplier.suppliercode }}</td>
                    <td style="min-width: 16rem">{{ supplier.suppliername }}</td>
                    <td style="min-width: 16rem">{{ supplier.city }}</td>
                    <td style="min-width: 16rem">{{ supplier.email }}</td>
                    <td style="min-width: 16rem">{{ supplier.contact_person }}</td>
                    <td style="min-width: 16rem">{{ supplier.loginid }}</td>
                    <td style="min-width: 16rem">{{ supplier.landline_number }}</td>
                    <td style="min-width: 16rem">{{ supplier.mobile_number}}</td>
                    
                   
                   
                    
                    
                </tr>
            </ng-template>
        </p-table>
        </p-panel>
        

       

        
    `,
    providers: [MessageService,ManageSuppliersService,  ConfirmationService]
})
export class ManageSuppliers implements OnInit {
    supplierDialog: boolean = false;

    suppliers = signal<Supplier[]>([]);

    supplier!: Supplier;

    selectedsuppliers!: Supplier[] | null;

    submitted: boolean = false;

    

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];
    isvalid: boolean = false;

    constructor(
        private managesupplierservice: ManageSuppliersService,
        private messageService: MessageService,
        private authservice: AuthenticationService,
        private confirmationService: ConfirmationService,
        public router: Router
    ) {
        this.authservice.user.subscribe((x)=>{
      if(x?.loginid =='SuperAdmin'){
        this.isvalid = true
      }
      else if(x?.loginid =='Admin'){
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
       this.managesupplierservice.getSuppliers().subscribe((data:any) => {
            this.suppliers.set(data);
        });

        

        this.cols = [
            { field: 'suppliercode', header: 'Supplier Code', customExportHeader: 'Supplier Code' },
            { field: 'suppliername', header: 'Supplier Name' },
            { field: 'city', header: 'City' },
            { field: 'email', header: 'Email' },
             { field: 'contact_person', header: 'Contact Person' },
             { field: 'loginid', header: 'Login Id' },
              { field: 'landline_number', header: 'Landline Number' },
               { field: 'mobile_number', header: 'Mobile Number' },
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    gotoView(){
        this.router.navigate(['/app/pages/viewmanagepos'])    }    

    

    

    
}
