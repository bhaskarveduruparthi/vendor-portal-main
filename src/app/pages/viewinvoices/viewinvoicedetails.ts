import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ManageDeliverySchedulesService } from '../service/managedeliveryschedules.service';
import { ActivatedRoute } from '@angular/router';

interface DeliveryItem {
  materialCode: string;
  materialDescription: string;
  unit: string;
  reason?: string;
}

@Component({
    selector: 'app-viewinvoicedetails',
    standalone: true,
    imports: [RouterModule, TextareaModule, ButtonModule,PanelModule, TableModule],
    styles:[`
      .po-container {
  
  
  padding: 18px;
  max-width: 950px;
  margin: 24px auto;
  
  font-family: Arial, sans-serif;
}

.po-header-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px 18px;
  
  padding-bottom: 12px;
}

.po-header-grid label {
  color: #7b929b;
  font-weight: bold;
}

.po-header-grid div {
  padding: 2px 0;
}

.po-header-grid span {
  color: #7b929b;
}
`
    ],
    template: ` 
    
      <p-panel>
  <div class="po-container">
    <div class="po-header-grid">
      <div><label>PO No:</label> <span>{{headerInfo.deliveryschedule_no}}</span></div>
      <div><label>Valid From:</label> <span>{{headerInfo.validFrom}}</span></div>
      <div><label>Valid To:</label> <span>{{headerInfo.validTo}}</span></div>
      <div><label>Supplier Code:</label> <span>{{headerInfo.supplierCode}}</span></div>
      <div><label>Tax No (TIN):</label> <span>{{headerInfo.taxCode}}</span></div>
      <div><label>ECC No:</label> <span>{{headerInfo.eccNo}}</span></div>
      <div><label>PAN No:</label> <span>{{headerInfo.panNo}}</span></div>
      <div><label>Service Tax No:</label> <span>{{headerInfo.serviceTax}}</span></div>
      <div><label>Supplier Contact Person:</label> <span>{{headerInfo.contact}}</span></div>
      <div><label>Supplier Name:</label> <span>{{headerInfo.supplierName}}</span></div>
      <div><label>Supplier Address:</label> <span>{{headerInfo.supplierStreet}}</span></div>
      <div><label>Supplier Location:</label> <span>{{headerInfo.supplierLocation}}</span></div>
      
    </div>
  </div>
</p-panel>

<br>

<p-table #dt [value]="invoiceDetails" [loading]="loading"  [tableStyle]="{ 'min-width': '75rem' }" [scrollable]="true" scrollHeight="400px">
  <ng-template pTemplate="header">
    <tr>
      <th style="min-width:16rem; color:#F4991A; font-weight:bold">Material Description</th>
      <th style="min-width:16rem; color:#F4991A; font-weight:bold">Material Code</th>
      <th style="min-width:16rem; color:#F4991A; font-weight:bold">UOM</th>
      <th style="min-width:16rem; color:#F4991A; font-weight:bold">Quantity</th>
      <th style="min-width:16rem; color:#F4991A; font-weight:bold">Price Per Unit</th>
      <th style="min-width:16rem; color:#F4991A; font-weight:bold">Gross Value</th>
      <th style="min-width:16rem; color:#F4991A; font-weight:bold">PO Number</th>
      <th style="min-width:16rem; color:#F4991A; font-weight:bold">PO Date</th>
      <th style="min-width:16rem; color:#F4991A; font-weight:bold">Gross Weight</th>
      <th style="min-width:16rem; color:#F4991A; font-weight:bold">Tax Code</th>
      <th style="min-width:16rem; color:#F4991A; font-weight:bold">AED Rate</th>
      <th style="min-width:16rem; color:#F4991A; font-weight:bold">Service Tax</th>
    </tr>
  </ng-template>
  <ng-template pTemplate="body" let-row>
    <tr>
      <td>{{ row.MAKTX }}</td>
      <td>{{ row.MATNR }}</td>
      <td>{{ row.MEINS }}</td>
      <td>{{ row.MENGE }}</td>
      <td>{{ row.NETPR }}</td>
      <td>{{ row.NETWR }}</td>
      <td>{{ row.EBELN }}</td>
      <td>{{ row.BEDAT }}</td>
      <td>{{ row.BRGEW }}</td>
      <td>{{ row.MWSKZ }}</td>
      <td>{{ row.AEDRATE }}</td>
      <td>{{ row.OITXCON1 }}</td>
    </tr>
  </ng-template>
</p-table>

  <br>
  <div class="button-row">
    <button pButton type="button" label="Back" class="p-button-sm p-button-danger" (click)="onBack()"></button>
  </div>



       `
})




export class ViewInvoiceDetails implements OnInit {
  
  items: DeliveryItem[] = [];
  headerInfo = {
  deliveryschedule_no: '',   // Not present, can map from ZEBELN if needed
  validFrom: '',
  validTo: '',
  supplierCode: '',
  taxCode: '',
  eccNo: '',
  contact: '',
  panNo: '',
  serviceTax: '',
  supplierStreet: '',
  supplierName: '',
  supplierLocation: ''
};

loading: boolean = true

invoiceDetails: any[] = [];

    constructor(
       public managedeliveryservice: ManageDeliverySchedulesService, private route: ActivatedRoute
    ) {}

  ngOnInit() {
  this.route.queryParams.subscribe(params => {
    const ebeln = params['ebeln'];
    if (ebeln) {
      this.managedeliveryservice.getInvoiceDetails(ebeln).subscribe({
        next: (response: any) => {
          this.loading = false
          const invHead = (response.ZINV_HEAD?.[0]) || {};

          this.headerInfo = {
            deliveryschedule_no: invHead.ZEBELN || '',
            validFrom: invHead.VALIDFR || '',
            validTo: invHead.VALIDTO || '',
            supplierCode: invHead.LIFNR || '',
            taxCode: invHead.STCD1 || '',
            eccNo: invHead.ECCNO || '',
            contact: invHead.CONTACT || '',
            panNo: invHead.PANNO || '',
            serviceTax: invHead.SERVTX || '',
            supplierStreet: invHead.STREET || '',
            supplierName: invHead.MCDK1 || '',
            supplierLocation: invHead.MCDK3 || ''
          };

          // Add this to assign invoice details array
          this.invoiceDetails = response.ET_INVOICE_DETAILS || [];
          console.log(this.invoiceDetails);
        },
        error: () => {
          console.log("Error retrieving invoice head data");
        }
      });
    }
  });
}

    

    





    onBack() {
    window.history.back();
  }
}
