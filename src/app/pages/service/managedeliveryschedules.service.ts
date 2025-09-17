import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



export interface Deliveryschedule {
    
    suppliername?: string;
    purchaseorderno?:string;
    purchaseorder_date?:string;
    deliveryschedule_no?:string;
    deliveryschedule_date?:string;
    created_by?:string;
    created_date?:string;
    lastupdated_date?:string;
    lastupdated_by?:string;

   
}

@Injectable()
export class ManageDeliverySchedulesService {
    getDeliveryschedulesData() {
       return[
        {
    suppliername: "Supplier A",
    purchaseorderno: "PO1001",
    purchaseorder_date: "2025-07-01",
    deliveryschedule_no: "DS1001",
    deliveryschedule_date: "2025-07-10",
    created_by: "User1",
    created_date: "2025-06-28",
    lastupdated_date: "2025-06-30",
    lastupdated_by: "User2"
  },
  {
    suppliername: "Supplier B",
    purchaseorderno: "PO1002",
    purchaseorder_date: "2025-07-02",
    deliveryschedule_no: "DS1002",
    deliveryschedule_date: "2025-07-11",
    created_by: "User3",
    created_date: "2025-06-29",
    lastupdated_date: "2025-07-01",
    lastupdated_by: "User3"
  },
  {
    suppliername: "Supplier C",
    purchaseorderno: "PO1003",
    purchaseorder_date: "2025-07-03",
    deliveryschedule_no: "DS1003",
    deliveryschedule_date: "2025-07-12",
    created_by: "User1",
    created_date: "2025-06-30",
    lastupdated_date: "2025-07-02",
    lastupdated_by: "User4"
  },
  {
    suppliername: "Supplier D",
    purchaseorderno: "PO1004",
    purchaseorder_date: "2025-07-04",
    deliveryschedule_no: "DS1004",
    deliveryschedule_date: "2025-07-13",
    created_by: "User2",
    created_date: "2025-07-01",
    lastupdated_date: "2025-07-03",
    lastupdated_by: "User1"
  },
  {
    suppliername: "Supplier E",
    purchaseorderno: "PO1005",
    purchaseorder_date: "2025-07-05",
    deliveryschedule_no: "DS1005",
    deliveryschedule_date: "2025-07-14",
    created_by: "User3",
    created_date: "2025-07-02",
    lastupdated_date: "2025-07-04",
    lastupdated_by: "User2"
  },
  {
    suppliername: "Supplier F",
    purchaseorderno: "PO1006",
    purchaseorder_date: "2025-07-06",
    deliveryschedule_no: "DS1006",
    deliveryschedule_date: "2025-07-15",
    created_by: "User4",
    created_date: "2025-07-03",
    lastupdated_date: "2025-07-05",
    lastupdated_by: "User3"
  },
  {
    suppliername: "Supplier G",
    purchaseorderno: "PO1007",
    purchaseorder_date: "2025-07-07",
    deliveryschedule_no: "DS1007",
    deliveryschedule_date: "2025-07-16",
    created_by: "User1",
    created_date: "2025-07-04",
    lastupdated_date: "2025-07-06",
    lastupdated_by: "User4"
  },
  {
    suppliername: "Supplier H",
    purchaseorderno: "PO1008",
    purchaseorder_date: "2025-07-08",
    deliveryschedule_no: "DS1008",
    deliveryschedule_date: "2025-07-17",
    created_by: "User2",
    created_date: "2025-07-05",
    lastupdated_date: "2025-07-07",
    lastupdated_by: "User1"
  },
  {
    suppliername: "Supplier I",
    purchaseorderno: "PO1009",
    purchaseorder_date: "2025-07-09",
    deliveryschedule_no: "DS1009",
    deliveryschedule_date: "2025-07-18",
    created_by: "User3",
    created_date: "2025-07-06",
    lastupdated_date: "2025-07-08",
    lastupdated_by: "User2"
  },
  {
    suppliername: "Supplier J",
    purchaseorderno: "PO1010",
    purchaseorder_date: "2025-07-10",
    deliveryschedule_no: "DS1010",
    deliveryschedule_date: "2025-07-19",
    created_by: "User4",
    created_date: "2025-07-07",
    lastupdated_date: "2025-07-09",
    lastupdated_by: "User3"
  }
       ];
    }

   

    

    constructor(private http: HttpClient) {}

    getDeliveryschedules() {
        return Promise.resolve(this.getDeliveryschedulesData());
    }

    
}
