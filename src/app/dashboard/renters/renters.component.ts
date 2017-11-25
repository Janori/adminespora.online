import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdSnackBar } from '@angular/material';
import {
  IPageChangeEvent,
  ITdDataTableColumn,
  ITdDataTableSortChangeEvent,
  TdDataTableService,
  TdDataTableSortingOrder
} from '@covalent/core';
import {routerAnimation} from '../../utils/page.animation';
import { Renter } from '../../shared/models';
import { RenterFormComponent } from './renter-form.component';

const NUMBER_FORMAT: (v: any) => any = (v: number) => v;
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'app-renters',
  templateUrl: './renters.component.html',
  styleUrls: ['./renters.component.scss'],
  animations: [routerAnimation]
})
export class RentersComponent implements OnInit {
    public title: string;

    constructor(private _router:Router,
                private _dataTableService: TdDataTableService,
                private _snackBar: MdSnackBar,
                public dialog: MdDialog) {

                    this.title = 'Arrendatarios';

              this.data = [
                  new Renter({
                      id: Math.floor((Math.random() * 1000) + 1),
                      name: 'Alejandro',
                      first_surname: 'Gori',
                      address: 'Calle real #' + Math.floor((Math.random() * 1000) + 1),
                      phone: '333' + Math.floor((Math.random() * 1000) + 1) +  '082',
                  })
              ];
        this.columns = [
            {name: 'id', label: '#', sortable: true},
            {name: 'full_name', label: 'Nombre', sortable: true},
            {name: 'created_at', label: 'Creado', sortable: true},
            {name: 'actions', label: 'Acciones', sortable: false },
        ];
      this.filteredData = this.data;
      this.filteredTotal = this.data.length;
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

  ngOnInit(): void {
    this.filter();
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

  editRenter = (renter?: Renter) => {
      const dialogRef = this.dialog.open(RenterFormComponent, {
          width: '700px',
          data: {
              renter: renter,
              closeDialog: (data: any) => {
                  dialogRef.close(data);
              }
          }
      });
      dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          if(result != false) {
              this._snackBar.open('Usuario editado con éxito', 'Aceptar', {
                  duration: 2000,
              });
          }
      });
  }

  deleteRenter = (row: any) => {
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

      this._snackBar.open('Usuaio eliminado con éxito', 'Aceptar', {
          duration: 2000,
      });
  }

}
