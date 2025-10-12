import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';


@Component({
    selector: 'app-paymentofadvice',
    standalone: true,
    imports: [RouterModule,  ButtonModule],
    template: ` 
        <div class="flex items-center justify-center min-h-screen overflow-hidden">
            <span>Page Under Development</span>
        </div>`
})
export class PaymentofAdvice {}
