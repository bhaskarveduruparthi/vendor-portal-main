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
    
    return this.http.get(`${this.url}sapdata/managepos`);
    }

    
}
