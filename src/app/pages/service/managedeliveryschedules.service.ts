
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { UrlService } from './url.service';


export class Deliveryschedule {
  supplier_name?: string;
  purchase_order_no?: string;
  purchase_order_date?: string;      // Date as ISO string (e.g., '2025-09-18')
  delivery_schedule_no?: number;
  delivery_schedule_date?: string;   // Date as ISO string
  created_by?: string;
  created_date?: string;              // DateTime as ISO string
  last_updated_date?: string;         // DateTime as ISO string
  last_updated_by?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ManageDeliverySchedulesService {
    

   

    

    private url :string;
  constructor(private http: HttpClient , private _url : UrlService) {
    this.url = `${this._url.getApiUrl()}`
  }

  getDeliveryschedules(i_date: string, i_date1: string) {
  const payload = {
    I_DATE: i_date,
    I_DATE1: i_date1
  };
  return this.http.post(`${this.url}sap/get_delivery_schedule`, payload);
  }


  getDeliveryScheduleDetails(I_EBELN: string) {
  const payload = { I_EBELN: I_EBELN };
  return this.http.post(`${this.url}sap/getpo_deliveryscheduledetails`, payload);
  }

  getInvoiceDetails(I_EBELN: string) {
  const payload = { I_EBELN: I_EBELN };
  return this.http.post(`${this.url}sap/viewinvoicedetails`, payload);
  }




    
}
