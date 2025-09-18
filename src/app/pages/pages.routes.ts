import { Routes } from '@angular/router';
import { PurchaseOrder } from './purchaseorder/purchaseorder';
import { ManagePOs } from './managepos/managepos';
import { ViewManagePOs } from './viewmanagepos/viewmanagepos';
import { ManageAdmins } from './manageadmins/manageadmins';
import { ManageSuppliers } from './managesuppliers/managesuppliers';
import { ManageInvoices } from './manageinvoices/manageinvoices';
import { Changepassword } from './changepassword/changepassword';
import { ManageDeliveryschedules } from './managedeliveryschedules/managedeliveryschedules';
import { ViewDeliverySchedules } from './viewdeliveryschedules/viewdeliveryschedules';

export default [
    
    {path: 'purchaseorder', component:  PurchaseOrder  },
    {path: 'managepos', component: ManagePOs},
    {path:'viewmanagepos', component: ViewManagePOs},
    {path: 'viewmanagedeliveryschedules', component: ViewDeliverySchedules},
    {path: 'manageadmins', component: ManageAdmins},
    {path:'managedeliveryschedules', component:ManageDeliveryschedules},
    {path: 'changepassword', component: Changepassword},
     {path: 'manageinvoices', component: ManageInvoices},
    {path:'managesuppliers', component: ManageSuppliers},
    { path: '**', redirectTo: '/notfound' }
] as Routes;
