import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    getProductsData() {
       return [
        {
    suppliername: "Domestic US Supplier 1",
    suppliercode: "1",
    email: "chandrasekhar.s@yash.com",
    plantcode: "1710",
    pono: "4500000100",
    podate: "19.04.2024"
  },
  {
    suppliername: "mjr companyc code",
    suppliercode: "456",
    email: "chandrasekhar.s@yash.com",
    plantcode: "1710",
    pono: "4500000667",
    podate: "04.09.2024"
  },
  {
    suppliername: "ABHINAV ENTERPRISES (TEST)",
    suppliercode: "51",
    email: "ABCD@GMAIL.COM",
    plantcode: "1710",
    pono: "4500000633",
    podate: "05.08.2024"
  },
  {
    suppliername: "Toyota Vendor Group",
    suppliercode: "321",
    email: "chandrasekhar.s@yash.com",
    plantcode: "1710",
    pono: "4500000942",
    podate: "04.02.2025"
  },
  {
    suppliername: "PAR1",
    suppliercode: "729",
    email: "pragati.pusdekar@yash.com",
    plantcode: "1710",
    pono: "4500000876",
    podate: "14.12.2024"
  }
       ];
    }

   

    

    constructor(private http: HttpClient) {}

    getProducts() {
        return Promise.resolve(this.getProductsData());
    }

    
}
