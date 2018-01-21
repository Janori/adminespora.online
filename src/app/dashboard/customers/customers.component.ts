import { Component, HostBinding, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdSnackBar } from '@angular/material';

import {
  IPageChangeEvent,
  ITdDataTableColumn,
  ITdDataTableSortChangeEvent,
  TdDataTableService,
  TdDataTableSortingOrder
} from '@covalent/core';

import { routerAnimation } from '../../utils/page.animation';
import { Customer } from '../../shared/models';
import { CustomerService } from '../../shared/services';
import { CustomerFormComponent } from './customer-form.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss'],
    animations: [routerAnimation],
    providers: [ CustomerService ]
})

export class CustomersComponent implements OnInit {
    public title: string;
    public kind: string;

    constructor(private _customerService: CustomerService,
                private _router:Router,
                private _dataTableService: TdDataTableService,
                private _snackBar: MdSnackBar,
                public dialog: MdDialog) {
        this.columns = [
            {name: 'id', label: '#', sortable: true},
            {name: 'full_name', label: 'Nombre', sortable: true},
            {name: 'created_at', label: 'Creado', sortable: true},
            {name: 'actions', label: 'Acciones', sortable: false },
        ];
        this.filteredData = this.data;
        this.filteredTotal = this.data.length;
    }

    ngOnInit() {
        if(this._router.url.includes('propietarios')) {
            this.kind   = Customer.KIND.OWNER;
            this.title  = 'Propietarios';
        }
        else if(this._router.url.includes('arrendatarios')) {
            this.kind   = Customer.KIND.RENTER;
            this.title  = 'Arrendatarios';
        }
        else {
            this.kind   = Customer.KIND.PROVIDER;
            this.title  = 'Proveedores';
        }

        this.getCustomers();
        this.filter();
    }

    // Add router animation
    @HostBinding('@routerAnimation') routerAnimation = true;
    // Table columns model
    columns: ITdDataTableColumn[] = [

    ];
    // Table data
    data: any[] = [
    ];
    // Table parameters
    filteredData: any[];
    filteredTotal: number;
    searchTerm = '';
    fromRow = 1;
    currentPage = 1;
    pageSize = 5;
    sortBy = 'name';
    sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

    getCustomers = () => {
      this._customerService.getAll().subscribe(result => {
          this.data = [];

          let customer = result.data;
              customer.forEach(customer => this.data.push(new Customer(customer)));

          this.filter();
      });
    }

    sort(sortEvent: ITdDataTableSortChangeEvent): void {
        this.sortBy = sortEvent.name;
        this.sortOrder = sortEvent.order;
        this.filter();
    }

    search(searchTerm: string): void {
        this.searchTerm = searchTerm;
        this.fromRow = 1;
        this.currentPage = 1;
        this.filter();
    }

    page(pagingEvent: IPageChangeEvent): void {
        this.fromRow = pagingEvent.fromRow;
        this.currentPage = pagingEvent.page;
        this.pageSize = pagingEvent.pageSize;
        this.filter();
    }

    filter(): void {
        let newData: any[] = this.data;
        newData = this._dataTableService.filterData(newData, this.searchTerm, true);
        this.filteredTotal = newData.length;
        newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
        newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
        this.filteredData = newData;
    }

    editCustomer = (customer?: Customer) => {
      const dialogRef = this.dialog.open(CustomerFormComponent, {
          width: '700px',
          data: {
              customer: customer,
              closeDialog: (data: any) => {
                  dialogRef.close(data);
              }
          }
      });
      dialogRef.afterClosed().subscribe(result => {
          if(result != false) {
              this._customerService.edit(result).subscribe(result => {
                  this._snackBar.open('Registro editado con éxito', 'Aceptar', {
                      duration: 2000,
                  });
              }, error => {
                  this._snackBar.open('Hubo un error en el servidor', 'Aceptar', {
                      duration: 2000,
                  });
              });
          }
      });
    }

    deleteCustomer = (row: any) => {
        let title = `Se va a eliminar a ${ row.full_name }`;
        let msg = '¿Estás seguro que deseas eliminar este registro?'
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: title,
                msg: msg,
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result == true) {
                this._customerService.delete(row).subscribe(result => {
                    if(result.status) {
                        let index = null;

                        for(let i in this.data) {
                            if(this.data[i].id == row.id)
                            index = i;
                        }

                        this.data = this.data.filter(function(item) {
                            return item.id != row.id
                        });

                        this.filteredData = this.data;
                        this.filteredTotal = this.data.length;

                        this._snackBar.open('Registro eliminado con éxito', 'Aceptar', {
                            duration: 2000,
                        });
                    }
                }, error => {
                    this._snackBar.open('Hubo un error en el servidor', 'Aceptar', {
                        duration: 2000,
                    });
                });
            }
        });
    }

}
