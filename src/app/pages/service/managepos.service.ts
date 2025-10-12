import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

interface InventoryStatus {
    label: string;
    value: string;
}

export interface Product {
    suppliername?:string,
    suppliercode?:string,
    email?:string,
    plantcode?: string;
    pono?: string;
    podate?: string;
   
}

@Injectable()
export class ManagePOsService {
    
   

    
 private url :string;
  constructor(private http: HttpClient , private _url : UrlService) {
    this.url = `${this._url.getApiUrl()}`
  }

    getPOS() {
    
    const I_DATE = '20240201';
    const payload = { I_DATE: I_DATE };
    return this.http.post(`${this.url}sap/get_purchaseorders`, payload);
    }

    getPODetails(I_EBELN: string) {
  const payload = { I_EBELN: I_EBELN };
  return this.http.post(`${this.url}sap/viewpodetails`, payload);
  }

    

    
}
