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

interface RawDeliverySchedule {
  BLART: string;
  BELNR: string;
  BLDAT: string;
  BUDAT: string;
  XBLNR: string;
  DMBTR: string;
  ZFBDT: string;
  SGTXT: string;
  GSBER: string;
}

interface StatementOfAccount {
  type: string;
  documentNo: string;
  documentDate: string;
  postingDate: string;
  reference: string;
  amountLocal: string;
  paymentDate: string;
  text: string;
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
  selector: 'app-statementofaccounts',
  standalone: true,
  imports: [
    RouterModule, ButtonModule, InputTextModule, PanelModule, 
    TableModule, ToolbarModule, IconFieldModule, InputIconModule, DatePickerModule, FormsModule
  ],
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

      <p-table #dt [value]="statements" [rows]="10"
    [columns]="cols"
    [loading]="loading"
    [paginator]="true"
    [globalFilterFields]="['documentno']"
    [loading]="loading" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Reports"
    [showCurrentPageReport]="true"
    [rowsPerPageOptions]="[10, 20, 30]"  [tableStyle]="{ 'min-width': '1000px' }">
        <ng-template #caption>
          <div class="flex items-center justify-between">
            <h5 class="m-0">Statement of Accounts</h5>
             <p-iconfield>
            <p-inputicon styleClass="pi pi-search" />
            <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" />
          </p-iconfield>
          </div>
        </ng-template>
        <ng-template pTemplate="header">
          <tr>
            <th>Type</th>
            <th>DocumentNo</th>
            <th>Document Date</th>
            <th>Posting Date</th>
            <th>Reference</th>
            <th>Amount In Local Currency</th>
            <th>Payment Date</th>
            <th>Text</th>
            <th>Bus Area</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-row>
          <tr>
            <td>{{row.type}}</td>
            <td>{{row.documentNo}}</td>
            <td>{{row.documentDate}}</td>
            <td>{{row.postingDate}}</td>
            <td>{{row.reference}}</td>
            <td>{{row.amountLocal}}</td>
            <td>{{row.paymentDate}}</td>
            <td>{{row.text}}</td>
            <td>{{row.busArea}}</td>
          </tr>
        </ng-template>
      </p-table>
    </p-panel>
  `
})
export class StatementofAccounts implements OnInit {

  @ViewChild('dt') dt!: Table;

  statements: StatementOfAccount[] = [];

  exportColumns!: ExportColumn[];

  loading: boolean = true;
cols: any[]|undefined;

i_date: Date | null = null;    // Use Date type bound from <p-datepicker>
i_date1: Date | null = null;

  constructor(
    public managedeliveryservice: ManageDeliverySchedulesService,
    
    public router: Router
  ) {}

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

  loadData() {
    this.loading = true;

    const formattedDate = this.i_date ? formatDate(this.i_date, 'yyyyMMdd', 'en') : '';
    const formattedDate1 = this.i_date1 ? formatDate(this.i_date1, 'yyyyMMdd', 'en') : '';

    this.managedeliveryservice.getstatementofaccounts(formattedDate, formattedDate1).subscribe(
      (response: any) => {
        const rawSchedules: RawDeliverySchedule[] = response.ET_RESULT || [];
        this.statements = rawSchedules.map(item => ({
          type: item.BLART,
          documentNo: item.BELNR,
          documentDate: this.formatDateString(item.BLDAT),
          postingDate: this.formatDateString(item.BUDAT),
          reference: item.XBLNR,
          amountLocal: item.DMBTR,
          paymentDate: this.formatDateString(item.ZFBDT),
          text: item.SGTXT,
          busArea: item.GSBER,
        }));
        this.loading = false;
      },
      (error) => {
        console.error('Error loading statement of accounts', error);
        this.loading = false;
      }
    );

    // Define columns to match table headers
    const cols: Column[] = [
      { field: 'type', header: 'Type' },
      { field: 'documentNo', header: 'DocumentNo' },
      { field: 'documentDate', header: 'Document Date' },
      { field: 'postingDate', header: 'Posting Date' },
      { field: 'reference', header: 'Reference' },
      { field: 'amountLocal', header: 'Amount In Local Currency' },
      { field: 'paymentDate', header: 'Payment Date' },
      { field: 'text', header: 'Text' },
      { field: 'busArea', header: 'Bus Area' },
    ];

    this.exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));
  }

  formatDateString(dateStr: string): string {
    if (!dateStr || dateStr.length !== 8) {
      return '';
    }
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${day}/${month}/${year}`;
  }
}
