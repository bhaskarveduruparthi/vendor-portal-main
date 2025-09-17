import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



export interface Invoice {
    suppliercode?: string;
    suppliername?: string;
    purchaseorderno?: string;
    invoice_no?: string;
    invoice_date?:string;
   
   
}

@Injectable()
export class ManageInvoicesService {
    getInvoicesData() {
     return[
         {
        suppliercode: "SUP001",
        suppliername: "ABC Supplies",
        purchaseorderno: "PO1001",
        invoice_no: "INV001",
        invoice_date: "2025-07-01"
    },
    {
        suppliercode: "SUP002",
        suppliername: "XYZ Traders",
        purchaseorderno: "PO1002",
        invoice_no: "INV002",
        invoice_date: "2025-07-03"
    },
    {
        suppliercode: "SUP003",
        suppliername: "PQR Materials",
        purchaseorderno: "PO1003",
        invoice_no: "INV003",
        invoice_date: "2025-07-05"
    },
    {
        suppliercode: "SUP004",
        suppliername: "LMN Enterprises",
        purchaseorderno: "PO1004",
        invoice_no: "INV004",
        invoice_date: "2025-07-07"
    },
    {
        suppliercode: "SUP005",
        suppliername: "DEF Industrial",
        purchaseorderno: "PO1005",
        invoice_no: "INV005",
        invoice_date: "2025-07-10"
    },
    {
        suppliercode: "SUP006",
        suppliername: "GHI Corporation",
        purchaseorderno: "PO1006",
        invoice_no: "INV006",
        invoice_date: "2025-07-12"
    },
    {
        suppliercode: "SUP007",
        suppliername: "JKL Wholesale",
        purchaseorderno: "PO1007",
        invoice_no: "INV007",
        invoice_date: "2025-07-14"
    },
    {
        suppliercode: "SUP008",
        suppliername: "MNO Distributors",
        purchaseorderno: "PO1008",
        invoice_no: "INV008",
        invoice_date: "2025-07-16"
    },
    {
        suppliercode: "SUP009",
        suppliername: "STU Supplies",
        purchaseorderno: "PO1009",
        invoice_no: "INV009",
        invoice_date: "2025-07-18"
    },
    {
        suppliercode: "SUP010",
        suppliername: "VWZ Logistics",
        purchaseorderno: "PO1010",
        invoice_no: "INV010",
        invoice_date: "2025-07-20"
    }
     ];
    }

   

    

    constructor(private http: HttpClient) {}

    getInvoices() {
        return Promise.resolve(this.getInvoicesData());
    }

    
}
