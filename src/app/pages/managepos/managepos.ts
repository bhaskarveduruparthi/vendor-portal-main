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
import { Product, ManagePOsService } from '../service/managepos.service';

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
    selector: 'app-managepos',
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
        <p-toolbar styleClass="mb-6">
            <ng-template #start>
               
            </ng-template>

            <ng-template #end>
                <p-button label="Export to Excel"  icon="pi pi-upload" severity="secondary" (onClick)="exportCSV()" />
            </ng-template>
        </p-toolbar>

        <p-table
            #dt
            [value]="products()"
            [rows]="10"
            [columns]="cols"
            [paginator]="true"
            [globalFilterFields]="['plantcode', 'pono', 'podate']"
            [tableStyle]="{ 'min-width': '75rem' }"
            [(selection)]="selectedProducts"
            [rowHover]="true"
            dataKey="id"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            [showCurrentPageReport]="true"
            [rowsPerPageOptions]="[10, 20, 30]"
        >
            <ng-template #caption>
                <div class="flex items-center justify-between">
                    <h5 class="m-0">Manage Scheduling Agreement /PO</h5>
                     
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search" />
                        <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Search..." />
                    </p-iconfield>
                </div>
            </ng-template>
            <ng-template #header>
                <tr>
                    <th style="width: 3rem">
                        <p-tableHeaderCheckbox />
                    </th>
                    <th pSortableColumn="plantcode" style="min-width:16rem">
                        Supplier Code
                        <p-sortIcon field="name" />
                    </th>
                    <th pSortableColumn="plantcode" style="min-width:16rem">
                        Supplier Name
                        <p-sortIcon field="name" />
                    </th>
                    <th pSortableColumn="plantcode" style="min-width:16rem">
                        Email Id
                        <p-sortIcon field="name" />
                    </th>
                    <th pSortableColumn="plantcode" style="min-width:16rem">
                        Plant Code
                        <p-sortIcon field="name" />
                    </th>
                    
                    <th pSortableColumn="pono" style="min-width: 8rem">
                        PO No
                        <p-sortIcon field="price" />
                    </th>
                    <th pSortableColumn="podate" style="min-width:10rem">
                        PO Date
                        <p-sortIcon field="category" />
                    </th>
                    <th  style="min-width: 12rem">
                        View PO Details
                        
                    </th>
                    
                </tr>
            </ng-template>
            <ng-template #body let-product>
                <tr>
                    <td style="width: 3rem">
                        <p-tableCheckbox [value]="product" />
                    </td>
                    <td style="min-width: 12rem">{{ product.suppliercode }}</td>
                    <td style="min-width: 16rem">{{ product.suppliername }}</td>
                    <td style="min-width: 16rem">{{ product.email }}</td>
                    <td style="min-width: 12rem">{{ product.plantcode }}</td>
                    <td style="min-width: 16rem">{{ product.pono }}</td>
                    <td style="min-width: 16rem">{{ product.podate }}</td>
                    
                   
                   
                    
                    <td>
                        <p-button label="View" class="mr-2" [rounded]="true" [outlined]="true" (onClick)="gotoView()" />
                        <p-button  label="Print" [rounded]="true" [outlined]="true"  />
                    </td>
                </tr>
            </ng-template>
        </p-table>

       

        
    `,
    providers: [MessageService, ManagePOsService, ConfirmationService]
})
export class ManagePOs implements OnInit {
    productDialog: boolean = false;

    products = signal<Product[]>([]);

    product!: Product;

    selectedProducts!: Product[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private productService: ManagePOsService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        public router: Router
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.loadDemoData();
    }

    loadDemoData() {
        this.productService.getProducts().then((data) => {
            this.products.set(data);
        });

        

        this.cols = [
            { field: 'suppliercode', header: 'Supplier Code' },
            { field: 'suppliername', header: 'Supplier Name' },
            { field: 'email', header: 'Email Id' },
            { field: 'plantcode', header: 'Plant Code', customExportHeader: 'Plant Code' },
            { field: 'ponum', header: 'PO No' },
            { field: 'podate', header: 'PO Date' },
            { field: 'podetails', header: 'View PO Details' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    gotoView(){
        this.router.navigate(['/app/pages/viewmanagepos'])    }    

    

    

    
}
