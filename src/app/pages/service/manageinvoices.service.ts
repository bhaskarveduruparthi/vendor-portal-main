import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';


export interface Invoice {
    supplier_code?: string;
    supplier_name?: string;
    purchase_order_no?: string;
    invoice_no?: string;
    invoice_date?: string;  
}


@Injectable({
  providedIn: 'root'
})
export class ManageInvoicesService {
    

   

    

    private url :string;
  constructor(private http: HttpClient , private _url : UrlService) {
    this.url = `${this._url.getApiUrl()}`
  }

    getInvoices() {
    
    const I_DATE = '20240201';
    const payload = { I_DATE: I_DATE };
    return this.http.post(`${this.url}sap/get_invoice_details`, payload);
}

    
}
