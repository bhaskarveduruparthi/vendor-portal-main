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
import { PanelModule } from 'primeng/panel';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Invoice, ManageInvoicesService } from '../service/manageinvoices.service';

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
    selector: 'app-manageinvoices',
    standalone: true,
    imports: [
        CommonModule,
        PanelModule,
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
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule
    ],
    styles:`
       .form-group {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.form-group label {
  width: 140px;       /* Fixed width for alignment */
  margin-right: 12px; /* Space between label and input */
  text-align: right;  /* Align label text right */
  font-weight: 600;   /* Optional: make label a bit bold */
}

.form-group input {
  flex: 1;            /* Input takes remaining width */
}
    `,
    template: `
       
       
        <p-toolbar styleClass="mb-6">
            <ng-template #start>
            
                  <div class="form-group">
  <label for="suppliercode">Supplier Code</label>
 <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Search" />
</div>

<div class="form-group">
  <label for="suppliername">Supplier Name</label>
  <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Search" />
</div>





<div class="form-group">
  <label for="invoice_no">Invoice No</label>
  <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Search" />
</div>

            </ng-template>

            <ng-template #end>
                
            </ng-template>
        </p-toolbar>

       <p-table
    #dt
    [value]="invoices()"
    [rows]="10"
    [columns]="cols"
    [paginator]="true"
    [globalFilterFields]="['supplier_code', 'supplier_name', 'purchase_order_no', 'invoice_no', 'invoice_date']"
    [tableStyle]="{ 'min-width': '75rem' }"
    [(selection)]="selectedinvoices"
    [rowHover]="true"
    dataKey="id"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Invoices"
    [showCurrentPageReport]="true"
    [rowsPerPageOptions]="[10, 20, 30]"
>
    <ng-template #caption>
        <div class="flex items-center justify-between">
            <h5 class="m-0">Manage Invoice Details</h5>
            <p-button label="Export to Excel" icon="pi pi-upload" severity="secondary" (onClick)="exportCSV()" />
        </div>
    </ng-template>
    <ng-template #header>
        <tr>
            <th style="width: 3rem">
                <p-tableHeaderCheckbox />
            </th>
            <th pSortableColumn="supplier_code" style="min-width:16rem">
                Supplier Code
                <p-sortIcon field="supplier_code" />
            </th>
            <th pSortableColumn="supplier_name" style="min-width: 8rem">
                Supplier Name
                <p-sortIcon field="supplier_name" />
            </th>
            <th pSortableColumn="purchase_order_no" style="min-width:10rem">
                Purchase Order No
                <p-sortIcon field="purchase_order_no" />
            </th>
            <th pSortableColumn="invoice_no" style="min-width: 12rem">
                Invoice No
                <p-sortIcon field="invoice_no" />
            </th>
            <th pSortableColumn="invoice_date" style="min-width: 12rem">
                Invoice Date
                <p-sortIcon field="invoice_date" />
            </th>
            <th style="min-width: 12rem">
                Invoice Details
            </th>
            <th style="min-width: 12rem">
                Bin/Truck Information
            </th>
            <th style="min-width: 12rem">
                Actions
            </th>
        </tr>
    </ng-template>
    <ng-template #body let-invoice>
        <tr>
            <td style="width: 3rem">
                <p-tableCheckbox [value]="invoice" />
            </td>
            <td style="min-width: 12rem">{{ invoice.supplier_code }}</td>
            <td style="min-width: 16rem">{{ invoice.supplier_name }}</td>
            <td style="min-width: 16rem">{{ invoice.purchase_order_no }}</td>
            <td style="min-width: 16rem">{{ invoice.invoice_no }}</td>
            <td style="min-width: 16rem">{{ invoice.invoice_date }}</td>
            <td>
                <p-button label="View" class="mr-2" [rounded]="true" [outlined]="true" (onClick)="gotoView()" />
                <p-button label="Print" [rounded]="true" [outlined]="true" />
            </td>
            <td>
                <p-button label="Update" [rounded]="true" [outlined]="true" />
            </td>
            <td>
                <p-button label="Delete" [rounded]="true" [outlined]="true" />
            </td>
        </tr>
    </ng-template>
</p-table>


       

        
    `,
    providers: [MessageService,ManageInvoicesService,  ConfirmationService]
})
export class ManageInvoices implements OnInit {
    invoiceDialog: boolean = false;

    invoices = signal<Invoice[]>([]);

    invoice!: Invoice;

    selectedinvoices!: Invoice[] | null;

    submitted: boolean = false;

    

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private manageinvoiceservice: ManageInvoicesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        public router: Router
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
       this.manageinvoiceservice.getInvoices().subscribe((data:any) => {
            this.invoices.set(data);
        });

        

        this.cols = [
    { field: 'supplier_code', header: 'Supplier Code', customExportHeader: 'Supplier Code' },
    { field: 'supplier_name', header: 'Supplier Name' },
    { field: 'purchase_order_no', header: 'Purchase Order No' },
    { field: 'invoice_no', header: 'Invoice No' },
    { field: 'invoice_date', header: 'Invoice Date' }
];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    gotoView(){
        this.router.navigate(['/app/pages/viewmanagepos'])    }    

    

    

    
}
