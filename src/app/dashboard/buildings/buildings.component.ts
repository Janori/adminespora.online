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
import { BuildingService } from '../../shared/services';
import { BuildingFormComponent } from './building-form.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

const NUMBER_FORMAT: (v: any) => any = (v: number) => v;
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss'],
  animations: [routerAnimation],
  providers: [ BuildingService ]
})
export class BuildingsComponent implements OnInit {
    public title: string;

    constructor(private _router:Router,
                private _dataTableService: TdDataTableService,
                private _buildingService: BuildingService,
                private _snackBar: MdSnackBar,
                public dialog: MdDialog) {

        this.title = 'Inmuebles';
        this.columns = [
            {name: 'id', label: '#', sortable: true},
            {name: 'land.surface', label: 'Terreno (m2)', sortable: true},
            {name: 'housing.rooms', label: 'Habitaciones', sortable: true},
            {name: 'price', label: 'Precio de Renta ($)', sortable: true},
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
      this.getBuildings();
      this.filter();
  }

  getBuildings() {
      this._buildingService.getAll().subscribe(result => {
          this.data = [];

          let users = result.data;
              users.forEach(user => this.data.push(new Building(user)));

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
      let title = `Se va a eliminar al inmueble #${ row.id }`;
      let msg = '¿Estás seguro que deseas eliminar este registro?'
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          data: {
              title: title,
              msg: msg,
          }
      });
      dialogRef.afterClosed().subscribe(result => {
          if(result == true) {
              this._buildingService.delete(row).subscribe(result => {
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
