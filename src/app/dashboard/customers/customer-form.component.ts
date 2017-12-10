import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDatepicker, MdSnackBar } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { Customer } from '../../shared/models';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
    public title: string;
    constructor(
      @Inject(MD_DIALOG_DATA) public data: any,
      public dialogRef: MdDialogRef<CustomerFormComponent>) {
          console.log(this.data);
          this.title = this._mapTitle(data.customer);
    }

    _mapTitle = (customer: Customer) => {
        switch(customer.kind) {
            case Customer.KIND.OWNER: return 'Propietario';
            case Customer.KIND.PROVIDER: return 'Proveedor';
            case Customer.KIND.RENTER: return 'Arrendatador';
        }
    }

    ngOnInit() {
    }

}
