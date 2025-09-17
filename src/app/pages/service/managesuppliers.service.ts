import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



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
    getSuppliersData() {
       return [
         {
    suppliercode: "SUP001",
    suppliername: "Acme Tools Pvt Ltd",
    city: "Mumbai",
    email: "info@acmetools.com",
    contact_person: "Rajesh Sharma",
    loginid: "acme123",
    landline_number: "022-25678432",
    mobile_number: "9812345678"
  },
  {
    suppliercode: "SUP002",
    suppliername: "Star Supplies",
    city: "Delhi",
    email: "contact@starsupplies.in",
    contact_person: "Priya Verma",
    loginid: "star456",
    landline_number: "011-44553321",
    mobile_number: "9876543210"
  },
  {
    suppliercode: "SUP003",
    suppliername: "MegaPro Distributors",
    city: "Hyderabad",
    email: "sales@megapro.com",
    contact_person: "Anil Kumar",
    loginid: "mega321",
    landline_number: "040-22331144",
    mobile_number: "9001122334"
  },
  {
    suppliercode: "SUP004",
    suppliername: "Green Logistics",
    city: "Pune",
    email: "support@greenlog.com",
    contact_person: "Sunita Patil",
    loginid: "green007",
    landline_number: "020-33445566",
    mobile_number: "9822001122"
  },
  {
    suppliercode: "SUP005",
    suppliername: "Prime Industrial",
    city: "Chennai",
    email: "service@primeind.com",
    contact_person: "Krishna Rao",
    loginid: "prime2022",
    landline_number: "044-22334455",
    mobile_number: "9845012345"
  },
  {
    suppliercode: "SUP006",
    suppliername: "Vertex Solutions",
    city: "Kolkata",
    email: "connect@vertexsol.co.in",
    contact_person: "Mousumi Das",
    loginid: "vertex889",
    landline_number: "033-55667788",
    mobile_number: "9331000112"
  },
  {
    suppliercode: "SUP007",
    suppliername: "Swift Procurement",
    city: "Ahmedabad",
    email: "orders@swiftpro.com",
    contact_person: "Deepak Patel",
    loginid: "swift456",
    landline_number: "079-12345678",
    mobile_number: "9909007788"
  },
  {
    suppliercode: "SUP008",
    suppliername: "Brightline Traders",
    city: "Bengaluru",
    email: "enquiry@brightlinetraders.com",
    contact_person: "Lakshmi Menon",
    loginid: "bright888",
    landline_number: "080-23456789",
    mobile_number: "9886002233"
  },
  {
    suppliercode: "SUP009",
    suppliername: "Ace Wholesale",
    city: "Jaipur",
    email: "help@acewholesale.in",
    contact_person: "Rohit Singh",
    loginid: "acewhl101",
    landline_number: "0141-33445566",
    mobile_number: "9988776655"
  },
  {
    suppliercode: "SUP010",
    suppliername: "Sunshine Exports",
    city: "Lucknow",
    email: "sunshineexports@gmail.com",
    contact_person: "Neha Agarwal",
    loginid: "sunexp555",
    landline_number: "0522-22113344",
    mobile_number: "9415003344"
  }
    
       ];
    }

   

    

    constructor(private http: HttpClient) {}

    getSuppliers() {
        return Promise.resolve(this.getSuppliersData());
    }

    
}
