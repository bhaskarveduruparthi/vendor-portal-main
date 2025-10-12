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
import { PanelModule } from 'primeng/panel';
import { Product, ManagePOsService } from '../service/managepos.service';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface RawDeliverySchedule {
  LIFNR: string;      // supplier code
  NAME1: string;      // supplier name
  EBELN: string;      // purchase order number
  BEDAT: string;      // purchase order date
  WERKS: string;      // plant code
  SMTP_ADDR: string;  // email address
 
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
        PanelModule,
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
            [value]="products()"
            [rows]="10"
            [columns]="cols"
            [paginator]="true"
            [loading]="loading"
            [globalFilterFields]="['suppliercode','plantcode', 'pono', 'podate']"
            [tableStyle]="{ 'min-width': '75rem' }"
            [(selection)]="selectedProducts"
            [rowHover]="true"
            dataKey="id"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Records"
            [showCurrentPageReport]="true"
            [rowsPerPageOptions]="[10, 20, 30]"
        >
            <ng-template #caption>
                <div class="flex items-center justify-between">
                    <h5 class="m-0">Manage Scheduling Agreement /PO</h5>
                     
                   
                </div>
            </ng-template>
            <ng-template #header>
                <tr>
                    
                    <th  style="min-width:16rem">
                        Supplier Code
                        
                    </th>
                    <th  style="min-width:16rem">
                        Supplier Name
                       
                    </th>
                    <th  style="min-width:16rem">
                        Email Id
                        
                    </th>
                    <th  style="min-width:16rem">
                        Plant Code
                        
                    </th>
                    
                    <th  style="min-width: 8rem">
                        PO No
                        
                    </th>
                    <th  style="min-width:10rem">
                        PO Date
                        
                    </th>
                    <th  style="min-width: 12rem">
                        View PO Details
                        
                    </th>
                    
                </tr>
            </ng-template>
            <ng-template #body let-product>
                <tr>
                    
                    <td style="min-width: 12rem">{{ product.suppliercode }}</td>
                    <td style="min-width: 16rem">{{ product.suppliername }}</td>
                    <td style="min-width: 16rem">{{ product.email }}</td>
                    <td style="min-width: 12rem">{{ product.plantcode }}</td>
                    <td style="min-width: 16rem">{{ product.pono }}</td>
                    <td style="min-width: 16rem">{{ product.podate }}</td>
                    
                   
                   
                    
                    <td>
                        <p-button label="View" class="mr-2" [rounded]="true" [outlined]="true" (onClick)="gotoView(product.pono)" />
                        
                    </td>
                </tr>
            </ng-template>
        </p-table>
        </p-panel>
        

       

        
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

    loading: boolean = true;

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];
    ebeln!: string;

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
        this.loadData();
    }

    loadData() {
  this.productService.getPOS().subscribe(
    (response: any) => {
      // Parse and map ET_MANAGE_DELIVERY schedules (existing)
      const rawSchedules: RawDeliverySchedule[] = response.ET_SUPPLIERPOS || [];
      const mappedSchedules: Product[] = rawSchedules.map((item: RawDeliverySchedule) => ({
        suppliername: item.NAME1,
        suppliercode: item.LIFNR,
        email: item.SMTP_ADDR,
        plantcode: item.WERKS,
        pono: item.EBELN,
        podate: item.BEDAT
      }));
      console.log('Mapped Delivery Schedules:', mappedSchedules);
      this.products.set(mappedSchedules);

      

      this.loading = false;
    },
    (error) => {
      console.error('Error loading delivery schedules and supplier data', error);
      this.loading = false;
    }
  );



        

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

    gotoView(I_EBELN:string){
        this.ebeln = I_EBELN
        console.log(this.ebeln);
        this.router.navigate(['/app/pages/viewmanagepos'], { queryParams: { ebeln: this.ebeln } });
            
       
            }        

    

    

    
}
