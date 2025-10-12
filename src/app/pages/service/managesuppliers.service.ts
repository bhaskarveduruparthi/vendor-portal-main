import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';



export interface Supplier {
    suppliercode?: string;
    suppliername?: string;
    city?: string;
    email?: string;
    contact_person?:string;
    loginid?:string;
    landline_number?:string;
    mobile_number?:string;
   
}

@Injectable()
export class ManageSuppliersService {
   

   

    

    private url :string;
      constructor(private http: HttpClient , private _url : UrlService) {
        this.url = `${this._url.getApiUrl()}`
      }

    getSuppliers() {
      return this.http.get(`${this.url}suppliers/getallsuppliers`);
    }

    
}
