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
import { Deliveryschedule, ManageDeliverySchedulesService } from '../service/managedeliveryschedules.service';


interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface RawDeliverySchedule {
  NAME1: string;
  EBELN: string;
  AEDAT: string;
  ETENR: string;
  EINDT: string;
  // Add other fields if needed
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-managedeliveryschedules',
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
        <p-panel>
            <p-toolbar styleClass="mb-6">
            <ng-template #start>
            
                  



  <p-iconfield>
                        <p-inputicon styleClass="pi pi-search" />
                        <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Search..." />
                    </p-iconfield>










            </ng-template>

            <ng-template #end>
               <p-button label="Export to Excel" icon="pi pi-upload" severity="secondary" (onClick)="exportCSV()" /> 
            </ng-template>
        </p-toolbar>

        <p-table
    #dt
    [value]="deliveryschedules()"
    [rows]="10"
    [columns]="cols"
    [paginator]="true"
    [loading]="loading"
    [globalFilterFields]="['supplier_name', 'purchase_order_no']"
    [tableStyle]="{ 'min-width': '75rem' }"
    [(selection)]="selecteddeliveryschedules"
    [rowHover]="true"
    dataKey="id"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Delivery Schedules"
    [showCurrentPageReport]="true"
    [rowsPerPageOptions]="[10, 20, 30]"
>
    <ng-template #caption>
        <div class="flex items-center justify-between">
            <h5 class="m-0">Manage Delivery Schedules</h5>
            
            
        </div>
    </ng-template>
    <ng-template #header>
        <tr>
            <th  style="min-width: 8rem">
                Supplier Name
                
            </th>
            <th  style="min-width:10rem">
                Purchase Order No
                
            </th>
            <th  style="min-width: 12rem">
                Purchase Order Date
                
            </th>
            <th  style="min-width: 12rem">
                Delivery Schedule No
                
            </th>
            <th  style="min-width: 12rem">
                Delivery Schedule Date
               
            </th>
            <th style="min-width: 12rem">
                Delivery Schedule
            </th>
            
            
        </tr>
    </ng-template>
    <ng-template #body let-deliveryschedule>
        <tr>
            <td style="min-width: 16rem">{{ deliveryschedule.supplier_name }}</td>
            <td style="min-width: 16rem">{{ deliveryschedule.purchase_order_no }}</td>
            <td style="min-width: 16rem">{{ deliveryschedule.purchase_order_date }}</td>
            <td style="min-width: 16rem">{{ deliveryschedule.delivery_schedule_no }}</td>
            <td style="min-width: 16rem">{{ deliveryschedule.delivery_schedule_date }}</td>
            <td>
                <p-button label="View" class="mr-2" [rounded]="true" [outlined]="true" (onClick)="gotoView(deliveryschedule.purchase_order_no)" />
                
            </td>
            
        </tr>
    </ng-template>
        </p-table>

        </p-panel>
       
        


       

        
    `,
    providers: [MessageService,ManageDeliverySchedulesService,  ConfirmationService]
})
export class ManageDeliveryschedules implements OnInit {
    deliveryscheduleDialog: boolean = false;

    deliveryschedules = signal<Deliveryschedule[]>([]);

    deliveryschedule!: Deliveryschedule;

    selecteddeliveryschedules!: Deliveryschedule[] | null;

    submitted: boolean = false;

    ebeln!:string

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    loading: boolean = true;

    cols!: Column[];

    constructor(
        public managedeliveryservice: ManageDeliverySchedulesService,
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
 
  this.managedeliveryservice.getDeliveryschedules().subscribe(
    (response: any) => {
      const rawSchedules: RawDeliverySchedule[] = response.ET_MANAGE_DELIVERY || [];
      const mappedSchedules: Deliveryschedule[] = rawSchedules.map((item: RawDeliverySchedule) => ({
        supplier_name: item.NAME1,
        purchase_order_no: item.EBELN,
        purchase_order_date: item.AEDAT,
        delivery_schedule_no: Number(item.ETENR),
        delivery_schedule_date: item.EINDT
      }));

      console.log('Mapped Delivery Schedules:', mappedSchedules);
      this.deliveryschedules.set(mappedSchedules);
      this.loading = false;
    },
    (error) => {
      console.error('Error loading delivery schedules', error);
      this.loading = false;
    }
  );










        

        this.cols = [
    { field: 'supplier_name', header: 'Supplier Name' },
    { field: 'purchase_order_no', header: 'Purchase Order No' },
    { field: 'purchase_order_date', header: 'Purchase Order Date' },
    { field: 'delivery_schedule_no', header: 'Delivery Schedule No' },
    { field: 'delivery_schedule_date', header: 'Delivery Schedule Date' },
    { field: 'created_by', header: 'Created By' },
    { field: 'created_date', header: 'Created Date' },
    
];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    gotoView(I_EBELN:string){
        this.ebeln = I_EBELN
        console.log(this.ebeln);
        this.router.navigate(['/app/pages/viewmanagedeliveryschedules'], { queryParams: { ebeln: this.ebeln } });
            
       
            }    

    

    

    
}
