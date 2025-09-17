import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface InventoryStatus {
    label: string;
    value: string;
}

export interface Product {
    id?: string;
    plantcode?: string;
    pono?: string;
    podate?: string;
   
}

@Injectable()
export class ManagePOsService {
    getProductsData() {
       return [
        {
        id: 'P1001',
        plantcode: 'PLT001',
        pono: 'PO12345',
        podate: '2025-07-28'
    },
    {
        id: 'P1002',
        plantcode: 'PLT002',
        pono: 'PO12346',
        podate: '2025-07-30'
    },
    {
        id: 'P1003',
        plantcode: 'PLT003',
        pono: 'PO12347',
        podate: '2025-08-04'
    }
       ];
    }

   

    

    constructor(private http: HttpClient) {}

    getProducts() {
        return Promise.resolve(this.getProductsData());
    }

    
}
