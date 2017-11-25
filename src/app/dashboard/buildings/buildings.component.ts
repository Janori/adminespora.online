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
import { Building } from '../../shared/models';
import { BuildingFormComponent } from './building-form.component';

const NUMBER_FORMAT: (v: any) => any = (v: number) => v;
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss'],
  animations: [routerAnimation]
})
export class BuildingsComponent implements OnInit {
    public title: string;

    constructor(private _router:Router,
                private _dataTableService: TdDataTableService,
                private _snackBar: MdSnackBar,
                public dialog: MdDialog) {

                    this.title = 'Inmuebles';

              this.data = [
                  new Building({
                      id: Math.floor((Math.random() * 1000) + 1),
                      is_new: true,
                      address: 'Calle Real #1233',
                      rent_price: 5500,
                      comision: 10,
                      plazo_minimo: 2,
                      no_depositos: 1,
                      costo_mto: 500,
                      habitaciones: 3,
                      banos: 3,
                      estacionamientos: 0,
                      patios: 0,
                      terreno: 3000,
                      construccion: 3500,
                      ano_contruccion: 1990,
                      predial: 500,
                  }),
              ];
        this.columns = [
            {name: 'id', label: '#', sortable: true},
            {name: 'terreno', label: 'Terreno (m2)', sortable: true},
            {name: 'habitaciones', label: 'Habitaciones', sortable: true},
            {name: 'rent_price', label: 'Precio de Renta ($)', sortable: true},
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

  editBuilding = (building?: Building) => {
      const dialogRef = this.dialog.open(BuildingFormComponent, {
          width: '700px',
          data: {
              building: building,
          }
      });
      dialogRef.afterClosed().subscribe(result => {
          console.log(result);
          if(result != false) {
              this._snackBar.open('Inmueble editado con éxito', 'Aceptar', {
                  duration: 2000,
              });
          }
      });
  }

  deleteBuilding = (row: any) => {
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

      this._snackBar.open('Inmueble eliminado con éxito', 'Aceptar', {
          duration: 2000,
      });
  }

}
