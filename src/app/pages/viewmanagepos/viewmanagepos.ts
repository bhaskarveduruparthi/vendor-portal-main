import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { TextareaModule } from 'primeng/textarea';

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
    imports: [RouterModule, AppFloatingConfigurator,TextareaModule, ButtonModule,PanelModule, TableModule],
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
    
    
   <div class="container">
      <p-panel>
        <div class="po-container">
      <div class="po-header-grid">
        <div><label>PO Number & Date:</label> <span>{{headerInfo.poNumber}}</span></div>
        <div><label>Valid From:</label> <span>{{headerInfo.validFrom}}</span></div>
        <div><label>Supplier Name:</label> <span>{{headerInfo.supplierName}}</span></div>
        <div><label>Valid To:</label> <span>{{headerInfo.validTo}}</span></div>
        <div><label>Supplier Code:</label> <span>{{headerInfo.supplierCode}}</span></div>
        <div><label>Supplier Address:</label> <span>{{headerInfo.address}}</span></div>
        <div><label>TIN No:</label> <span>{{headerInfo.tinNo}}</span></div>
        <div><label>Contact Person:</label> <span>{{headerInfo.contactPerson}}</span></div>
        <div><label>ECC No:</label> <span>{{headerInfo.eccNo}}</span></div>
        <div><label>Service Tax No:</label> <span>{{headerInfo.serviceTaxNo}}</span></div>
        <div><label>PAN No:</label> <span>{{headerInfo.panNo}}</span></div>
        <div></div>

      </div>
         <div>
          <label><strong>Header Text:</strong></label>
          <br>
        <textarea rows="5"cols="80" pTextarea [autoResize]="true" [value]="headerInfo.headertext" ></textarea>
        </div>
        
        </div>
      </p-panel>
      
  
  
  <br>  

    
      
   
   
      
      
      
    
      
   
  

  <p-table #dt [value]="items"  [tableStyle]="{ 'min-width': '75rem' }" >
    <ng-template pTemplate="header">
      <tr>
        <th>Sl.No.</th>
        <th>Material Description</th>
        <th>Material Code</th>
        <th>Unit</th>
        <th>Price/Unit</th>
        <th>GrossValue</th>
        <th>CentVat or ServiceTax(%)</th>
        <th>Edcs(%)</th>
        <th>SHECess(%)</th>
        <th>VAT/CST(%)</th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-row>
      <tr>
        <td>{{row.slNo}}</td>
        <td>{{row.materialDescription}}</td>
        <td>{{row.materialCode}}</td>
        <td>{{row.unit}}</td>
        <td>{{row.priceUnit}}</td>
        <td>{{row.grossValue}}</td>
        <td>{{row.centVat}}</td>
        <td>{{row.edcs}}</td>
        <td>{{row.sheCess}}</td>
        <td>{{row.vatCst}}</td>
      </tr>
    </ng-template>
  </p-table>
  <br>
  <div class="button-row">
    <button pButton type="button" label="Back" class="p-button-sm p-button-danger" (click)="onBack()"></button>
  </div>
</div>


       `
})




export class ViewManagePOs {

    headerInfo = {
  poNumber: '7210001643/15-04-2014',
  supplierName: 'KRISHNA INDUSTRIES',
  supplierCode: '100017',
  tinNo: '6911301243',
  validFrom: '01-10-2013',
  address: '38/30, B.P., N.I.T., FARIDABAD, FARIDABAD',
  validTo: '31-03-2015',
  contactPerson: 'Krishna',
  eccNo: 'AABPKZ067XM001',
  serviceTaxNo: 'AABPKZ067XM001',
  panNo: 'AABFK2067N',
  headertext: 'NA'
};
  // TABLE DATA
  items: Item[] = [
    { slNo: 1, materialDescription: 'SEAT SPRING (P-70 REAR)', materialCode: '10300000000000', unit: 'NO', pricePerUnit: 4.5, grossValue: 455000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1 },
    { slNo: 2, materialDescription: 'SEAT SPRING MMC,HP,TURBO,SHAKTI', materialCode: '10300000000000', unit: 'NO', pricePerUnit: 2.15, grossValue: 215000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1 },
    { slNo: 3, materialDescription: 'CAP DAMPER MMC,HP,TURBO,SKATI', materialCode: '11000000000000', unit: 'NO', pricePerUnit: 1.04, grossValue: 104000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1 },
    { slNo: 4, materialDescription: 'SEAT SPRING UNDER KRP F/C', materialCode: '11000000000000', unit: 'NO', pricePerUnit: 0.62, grossValue: 62000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1 },
    { slNo: 5, materialDescription: 'PLATE END PLT. KHCR,P11,SLKCR,P17-R', materialCode: '11000000000000', unit: 'NO', pricePerUnit: 2.42, grossValue: 242000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1 },
    { slNo: 6, materialDescription: 'SEAT SPRING,P11,P-17K,KEMA-R KRPF R/C', materialCode: '11000000000000', unit: 'NO', pricePerUnit: 2.44, grossValue: 244000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1 },
    { slNo: 7, materialDescription: 'SPRING ADJUSTER PLATED (P-40 REAR)ND.', materialCode: '10100000000000', unit: 'NO', pricePerUnit: 9.13, grossValue: 913000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1 },
    { slNo: 8, materialDescription: 'SPRING ADJUSTER PLATED (P21 REAR)', materialCode: '10100000000000', unit: 'NO', pricePerUnit: 9.13, grossValue: 913000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1 },
    { slNo: 9, materialDescription: 'SPRING ADJUSTER PLATED H.S.REAR', materialCode: '10100000000000', unit: 'NO', pricePerUnit: 3.34, grossValue: 334000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1 },
    { slNo: 10, materialDescription: 'SPRING STOPPER KSP REAR', materialCode: '10100000000000', unit: 'NO', pricePerUnit: 1.37, grossValue: 137000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1 },
    { slNo: 11, materialDescription: 'COLLER SPRING HHFF 19801', materialCode: '10100000000000', unit: 'NO', pricePerUnit: 1.67, grossValue: 167000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1 },
    { slNo: 12, materialDescription: 'SPRING ADJUSTER P30.DPLX.NI.C.R.PL.', materialCode: '10100000000000', unit: 'NO', pricePerUnit: 13.05, grossValue: 1305000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1 }
  ];





    onBack() {
    window.history.back();
  }
}
