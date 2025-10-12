import { Component, Injectable, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ManagePOsService } from '../service/managepos.service';
import { ActivatedRoute } from '@angular/router';

interface Item {
  slNo: number;
  materialDescription: string;
  materialCode: string;
  unit: string;
  pricePerUnit: number;
  grossValue: number;
  centVat: number;
  edcs: number;
  sheCess: number;
  vatCst: number;
}



@Component({
    selector: 'app-viewmanagepos',
    standalone: true,
    providers: [ManagePOsService],
    imports: [RouterModule,TextareaModule, ButtonModule,PanelModule, TableModule],
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
  color: #fff;
  font-weight: bold;
}

.po-header-grid div {
  padding: 2px 0;
}

.po-header-grid span {
  color: #fff;
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
    <div>
      <label><strong>Header Text:</strong></label>
      <br>
      <textarea rows="5" cols="80" pTextarea [autoResize]="true" ></textarea>
    </div>
  </div>
</p-panel>

<br>

<p-table #dt [value]="purchaseOrderItems" [loading]="loading" dataKey="id" [tableStyle]="{ 'min-width': '75rem' }">
  <ng-template pTemplate="header">
    <tr>
      
      <th>Material Description</th>
      <th>Material Code</th>
      <th>Unit</th>
      <th>Price/Unit</th>
      <th>Gross Value</th>
      <th>CentVat or ServiceTax(%)</th>
      <th>Edcs(%)</th>
      <th>SHECess(%)</th>
      <th>VAT/CST(%)</th>
    </tr>
  </ng-template>
  <ng-template pTemplate="body" let-row>
  <tr>
    <td>{{ row.MAKTX }}</td>
    <td>{{ row.MATNR }}</td>
    <td>{{ row.MEINS }}</td>
    <td>{{ row.NETPR }}</td>
    <td>{{ row.NETWR }}</td>
    <td>{{ row.OITXCON1 }}</td>
    <td>{{ row.EXAED || 0 }}</td>
    <td>{{ row.EXBED || 0 }}</td>
    <td>{{ row.AEDRATE || row.BEDRATE || 0 }}</td>
  </tr>
</ng-template>
</p-table>

  <br>
  <div class="button-row">
    <button pButton type="button" label="Back" class="p-button-sm p-button-danger" (click)="onBack()"></button>
  </div>



       `
})


@Injectable({
  providedIn: 'root'
})

export class ViewManagePOs implements OnInit {

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

purchaseOrderItems: any[] = [];

  constructor(
       public manageposervice: ManagePOsService, private route: ActivatedRoute
    ) {}

  ngOnInit() {
  this.route.queryParams.subscribe(params => {
    const ebeln = params['ebeln'];
    if (ebeln) {
      this.manageposervice.getPODetails(ebeln).subscribe({
        next: (response: any) => {
          this.loading = false;
          
          // Map invoice header info
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
          
          // Map PO details
          this.purchaseOrderItems = response.ET_PO_DETAILS || [];
          console.log(this.purchaseOrderItems);
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
