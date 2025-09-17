import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface InventoryStatus {
    label: string;
    value: string;
}

export interface PurchaseOrderItem {
  slNo: number;
  materialDescription: string;
  materialCode: string;
  unit: string;
  pricePerUnit: number;
  grossValue: number;
  centVat: number;
  edcs: number;
  sheCess: number;
  vatCst: number;
}

@Injectable()
export class ViewManagePOsService {

    orderDetails = {
    poNumber: '7210001643/15-04-2014',
    validFrom: '01-10-2013',
    validTo: '31-03-2015',
    supplierName: 'KRISHNA INDUSTRIES',
    address: '38/30, B.P., N.I.T., FARIDABAD, FARIDABAD',
    supplierCode: '100017',
    contactPerson: 'Krishna',
    tinNo: '6911301243',
    eccNo: 'AABPKZ067XM001',
    serviceTaxNo: 'AABPKZ067XM001',
    panNo: 'AABFK2067N'
    };

    purchaseItems: PurchaseOrderItem[] = [
    {slNo: 1, materialDescription: 'SEAT SPRING (P-70 REAR)', materialCode: '10300000000000', unit: 'NO', pricePerUnit: 4.5, grossValue: 455000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1},
    {slNo: 2, materialDescription: 'SEAT SPRING MMC,HP,TURBO,SHAKTI', materialCode: '10300000000000', unit: 'NO', pricePerUnit: 2.15, grossValue: 215000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1},
    {slNo: 3, materialDescription: 'CAP DAMPER MMC,HP,TURBO,SKATI', materialCode: '11000000000000', unit: 'NO', pricePerUnit: 1.04, grossValue: 104000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1},
    {slNo: 4, materialDescription: 'SEAT SPRING UNDER KRP F/C', materialCode: '11000000000000', unit: 'NO', pricePerUnit: 0.62, grossValue: 62000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1},
    {slNo: 5, materialDescription: 'PLATE END PLT. KHCR,P11,SLKCR,P17-R', materialCode: '11000000000000', unit: 'NO', pricePerUnit: 2.42, grossValue: 242000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1},
    {slNo: 6, materialDescription: 'SEAT SPRING,P11,P-17K,KEMA-R KRPF R/C', materialCode: '11000000000000', unit: 'NO', pricePerUnit: 2.44, grossValue: 244000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1},
    {slNo: 7, materialDescription: 'SPRING ADJUSTER PLATED (P-40 REAR)ND.', materialCode: '10100000000000', unit: 'NO', pricePerUnit: 9.13, grossValue: 913000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1},
    {slNo: 8, materialDescription: 'SPRING ADJUSTER PLATED (P-21 REAR)', materialCode: '10100000000000', unit: 'NO', pricePerUnit: 9.13, grossValue: 913000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1},
    {slNo: 9, materialDescription: 'SPRING ADJUSTER PLATED H.S.REAR', materialCode: '11000000000000', unit: 'NO', pricePerUnit: 3.34, grossValue: 334000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1},
    {slNo: 10, materialDescription: 'SPRING STOPPER KSP REAR', materialCode: '10100000000000', unit: 'NO', pricePerUnit: 1.37, grossValue: 137000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1},
    {slNo: 11, materialDescription: 'COLLER SPRING HHFF 19801', materialCode: '10100000000000', unit: 'NO', pricePerUnit: 1.67, grossValue: 167000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1},
    {slNo: 12, materialDescription: 'SPRING ADJUSTER P30.DPLX.NI.C.RL.PL.', materialCode: '10100000000000', unit: 'NO', pricePerUnit: 13.05, grossValue: 1305000, centVat: 14, edcs: 2, sheCess: 1, vatCst: 1}
  ];


   

    

    constructor(private http: HttpClient) {}

    

    
}
