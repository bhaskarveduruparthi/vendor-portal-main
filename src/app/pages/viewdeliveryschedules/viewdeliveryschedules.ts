import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
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
    template: ` 
    
    
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




export class ViewDeliverySchedules implements OnInit {
  
  items: DeliveryItem[] = [];
   headerInfo = {
    deliveryschedule_no: '',
    deliveryschedule_date: '',
    purchaseorder_no: '',
    purchaseorder_date: '',
    supplierCode: '',
    supplierName: ''
  };

    constructor(
       public managedeliveryservice: ManageDeliverySchedulesService, private route: ActivatedRoute
    ) {}

   ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const ebeln = params['ebeln'];
      if (ebeln) {
        this.managedeliveryservice.getDeliveryScheduleDetails(ebeln).subscribe({
          next: (response: any) => {
            const sched = (response.ZSCHED_DET?.[0]) || {};
            this.headerInfo = {
              deliveryschedule_no: sched.ETENR || '',
              deliveryschedule_date: sched.BEDAT || '',
              purchaseorder_no: sched.EBELN || '',
              purchaseorder_date: sched.BEDAT || '',
              supplierCode: sched.LIFNR || '',
              supplierName: sched.NAME1 || ''
            };
            this.items = (response.ZPO_DET || []).map((row: any): DeliveryItem => ({
              materialCode: row.MATNR,
              materialDescription: row.MAKTX,
              unit: row.MEINS,
              reason: '' // Or map reason if present in data
            }));
          },
          error: () => {
            console.log("Error Found");
          }
        });
      }
    });
  }
    

    





    onBack() {
    window.history.back();
  }
}
