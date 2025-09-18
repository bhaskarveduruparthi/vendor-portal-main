import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { TextareaModule } from 'primeng/textarea';

interface Item {
  
  materialDescription: string;
  materialCode: string;
  unit: string;
  
}

@Component({
    selector: 'app-viewdeliveryschedules',
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
    template: ` <app-floating-configurator />
    
    
   <div class="container">
      <p-panel>
        <div class="po-container">
      <div class="po-header-grid">
        <div><label>Delivery Schedule No:</label> <span>{{headerInfo.deliveryschedule_no}}</span></div>
        <div><label>Delivery Schedule Date:</label> <span>{{headerInfo.deliveryschedule_date}}</span></div>
        <div><label>Purchase Order No:</label> <span>{{headerInfo.purchaseorder_no}}</span></div>
        <div><label>Purchase Order Date:</label> <span>{{headerInfo.purchaseorder_date}}</span></div>
        <div><label>Supplier Code:</label> <span>{{headerInfo.supplierCode}}</span></div>
        <div><label>Supplier Name:</label> <span>{{headerInfo.supplierName}}</span></div>
        

      </div>
        
        
        </div>
      </p-panel>
      
  
  
  <br>  

    
      
   
   
      
      
      
    
      
   
  

  <p-table #dt [value]="items"  [tableStyle]="{ 'min-width': '75rem' }" >
    <ng-template pTemplate="header">
      <tr>
         <th>Material Code</th>
        <th>Material Description</th>
        <th>Unit</th>
        <th>Reason</th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-row>
      <tr>
        <td>{{row.materialCode}}</td>
         <td>{{row.materialDescription}}</td>
        <td>{{row.unit}}</td>
        <td>{{row.reason}}</td>
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




export class ViewDeliverySchedules {

    headerInfo = {
  
  deliveryschedule_no: '',
  deliveryschedule_date: '',
  purchaseorder_no:'',
  purchaseorder_date: '',
  supplierName: 'KRISHNA INDUSTRIES',
  supplierCode: '100017',
 
};
  // TABLE DATA
  items: Item[] = [
   
 
  { materialCode: '10300000000000', materialDescription: 'SEAT SPRING MMC,HP,TURBO,SHAKTI', unit: 'NO' },
  { materialCode: '11000000000000', materialDescription: 'CAP DAMPER MMC,HP,TURBO,SKATI', unit: 'NO' },
  { materialCode: '11000000000000', materialDescription: 'SEAT SPRING UNDER KRP F/C', unit: 'NO' },
  { materialCode: '11000000000000', materialDescription: 'PLATE END PLT. KHCR,P11,SLKCR,P17-R', unit: 'NO' },
  { materialCode: '11000000000000', materialDescription: 'SEAT SPRING,P11,P-17K,KEMA-R KRPF R/C', unit: 'NO' },
  { materialCode: '10100000000000', materialDescription: 'SPRING ADJUSTER PLATED (P-40 REAR)ND.', unit: 'NO' },
  { materialCode: '10100000000000', materialDescription: 'SPRING ADJUSTER PLATED (P21 REAR)', unit: 'NO' },
  { materialCode: '10100000000000', materialDescription: 'SPRING ADJUSTER PLATED H.S.REAR', unit: 'NO' },
  { materialCode: '10100000000000', materialDescription: 'SPRING STOPPER KSP REAR', unit: 'NO' },
  { materialCode: '10100000000000', materialDescription: 'COLLER SPRING HHFF 19801', unit: 'NO' },
  { materialCode: '10100000000000', materialDescription: 'SPRING ADJUSTER P30.DPLX.NI.C.R.PL.', unit: 'NO' }


  ];





    onBack() {
    window.history.back();
  }
}
