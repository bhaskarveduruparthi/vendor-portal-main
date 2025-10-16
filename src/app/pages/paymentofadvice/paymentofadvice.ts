import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { Table, TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ManageDeliverySchedulesService } from '../service/managedeliveryschedules.service';
import { DatePickerModule } from 'primeng/datepicker';
import { formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PaymentAdviceRaw {
  WRBTR: string;
  SKFBT: string;
  WT_QSSHB: string;
  DMBTR: string;
  GSBER: string;
}

interface PaymentAdvice {
  billAmount: string;
  cashDiscount: string;
  tds: string;
  netAmount: string;
  busArea: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'app-paymentofadvice',
  standalone: true,
  imports: [RouterModule, ButtonModule, TableModule, FormsModule, DatePickerModule, PanelModule, ToolbarModule, IconFieldModule, InputIconModule ],
  template: `
    
   
    <p-panel>
         <p-toolbar styleClass="mb-6">
        <ng-template #start>
         <p-datepicker [(ngModel)]="i_date"   [iconDisplay]="'input'" placeholder="From Date" [showIcon]="true" inputId="icondisplay" style="margin-right: 10px;" />
        <p-datepicker [(ngModel)]="i_date1"   [iconDisplay]="'input'" placeholder="To Date" [showIcon]="true" inputId="icondisplay" style="margin-right: 10px;" />
        <p-button label="Search"  icon="pi pi-search" severity="primary" (onClick)="onSearch()" />
        </ng-template>

        <ng-template #end>
          <p-button label="Export to Excel" icon="pi pi-upload" severity="secondary" (onClick)="exportCSV()" />
        </ng-template>
    </p-toolbar>  
    <p-table
        #dt
        [loading]="loading"
        [value]="advices"
        [tableStyle]="{ 'min-width': '900px' }"
        [paginator]="true"
        [rows]="20"
        [showCurrentPageReport]="true"
        currentPageReportTemplate="Results {first}-{last} of {totalRecords} Reports">
        <ng-template #caption>
          <div class="flex items-center justify-between">
            <h5 class="m-0">Payment Advice</h5>
             <p-iconfield>
            <p-inputicon styleClass="pi pi-search" />
            <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" />
          </p-iconfield>
          </div>
        </ng-template>
        <ng-template pTemplate="header">
          <tr>
            <th>BillAmount</th>
            <th>Cash Discount</th>
            <th>TDS/STDS</th>
            <th>Net Amount</th>
            <th>Bus Area</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-row>
          <tr>
            <td>{{row.billAmount}}</td>
            <td>{{row.cashDiscount}}</td>
            <td>{{row.tds}}</td>
            <td>{{row.netAmount}}</td>
            <td>{{row.busArea && row.busArea.trim() !== '' ? row.busArea : 'N/A'}}</td>
          </tr>
        </ng-template>
      </p-table>
    </p-panel>
  `
})
export class PaymentofAdvice implements OnInit {
  advices: PaymentAdvice[] = [];

  loading: boolean = true;
cols: any[]|undefined;
exportColumns!: ExportColumn[];


i_date: Date | null = null;    // Use Date type bound from <p-datepicker>
i_date1: Date | null = null;
    dt: any;
   

  ngOnInit(): void {
    this.loadData();
  }

  exportCSV() {
    this.dt.exportCSV();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  onSearch() {
    this.loading = true;
    this.loadData();
  }

  constructor(
    public managedeliveryservice: ManageDeliverySchedulesService,
    
    public router: Router
  ) {}


  formatDateString(dateStr: string): string {
    if (!dateStr || dateStr.length !== 8) {
      return '';
    }
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${day}/${month}/${year}`;
  }

  loadData() {
  this.loading = true;
  const formattedDate = this.i_date ? formatDate(this.i_date, 'yyyyMMdd', 'en') : '';
    const formattedDate1 = this.i_date1 ? formatDate(this.i_date1, 'yyyyMMdd', 'en') : '';

  // If you are fetching from service, use code below. For demo, replace with your call:
  this.managedeliveryservice.getpaymentadvice(formattedDate, formattedDate1).subscribe(
    (response: any) => {
      const rawAdvices: PaymentAdviceRaw[] = response.ET_RESULT || [];

      this.advices = rawAdvices.map(item => ({
        billAmount: item.WRBTR,
        cashDiscount: item.SKFBT,
        tds: item.WT_QSSHB,
        netAmount: item.DMBTR,
        busArea: item.GSBER && item.GSBER.trim() ? item.GSBER.trim() : 'N/A'
      }));

      this.loading = false;
    },
    (error) => {
      console.error('Error loading payment advice', error);
      this.loading = false;
    }
  );

  // Define columns for table (optional, for export/etc)
  const cols: Column[] = [
    { field: 'billAmount', header: 'BillAmount' },
    { field: 'cashDiscount', header: 'Cash Discount' },
    { field: 'tds', header: 'TDS/STDS' },
    { field: 'netAmount', header: 'Net Amount' },
    { field: 'busArea', header: 'Bus Area' },
  ];

  this.exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));
}

}
