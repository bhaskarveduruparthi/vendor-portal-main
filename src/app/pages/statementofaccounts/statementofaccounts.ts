import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { Table, TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';


@Component({
    selector: 'app-statementofaccounts',
    standalone: true,
    imports: [RouterModule,  ButtonModule,InputTextModule, PanelModule, TableModule, ToolbarModule, IconFieldModule, InputIconModule],
    template: ` 
        
        <p-panel>
            
            <p-toolbar styleClass="mb-6">
            <ng-template #start>
              <p-iconfield>
                        <p-inputicon styleClass="pi pi-search" />
                        <input pInputText type="text" (input)="onGlobalFilter(dt, $event)"  />
                    </p-iconfield>
            </ng-template>

            <ng-template #end>
                <p-button label="Export to Excel"  icon="pi pi-upload" severity="secondary" (onClick)="exportCSV()" />
            </ng-template>
        </p-toolbar>
            <p-table  [tableStyle]="{ 'min-width': '1000px' }">
                <ng-template #caption>
                <div class="flex items-center justify-between">
                    <h5 class="m-0">Statement of Accounts</h5>
                     
                    
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
export class StatementofAccounts {

    @ViewChild('dt') dt!: Table;

    exportCSV() {
        this.dt.exportCSV();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
