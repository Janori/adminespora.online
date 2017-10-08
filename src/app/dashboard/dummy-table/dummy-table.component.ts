import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IPageChangeEvent,
  ITdDataTableColumn,
  ITdDataTableSortChangeEvent,
  TdDataTableService,
  TdDataTableSortingOrder
} from '@covalent/core';
import {routerAnimation} from '../../utils/page.animation';

const NUMBER_FORMAT: (v: any) => any = (v: number) => v;
const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'app-dummy-table',
  templateUrl: './dummy-table.component.html',
  styleUrls: ['./dummy-table.component.scss'],
  animations: [routerAnimation]
})
export class DummyTableComponent implements OnInit {
    title: string;
  constructor(private _router:Router, private _dataTableService: TdDataTableService) {
      this.title = this._formatTitle(this._router.url);

      switch(this.title) {
          case 'Usuarios':

              this.data = [
                  {
                      id: Math.floor((Math.random() * 1000) + 1),
                      name: 'Jonathan Anaya',
                      rol: 'Agente',
                      creado: '05/09/2017'
                  },
                  {
                      id: Math.floor((Math.random() * 1000) + 1),
                      name: 'John Doe 1',
                      rol: 'Agente',
                      creado: '04/09/2017'
                  },
                  {
                      id: Math.floor((Math.random() * 1000) + 1),
                      name: 'John Doe 2',
                      rol: 'Agente',
                      creado: '03/09/2017'
                  },
                  {
                      id: Math.floor((Math.random() * 1000) + 1),
                      name: 'John Doe 3',
                      rol: 'Agente',
                      creado: '02/09/2017'
                  }
              ];
                this.columns = [
                    {name: 'id', label: '#', sortable: true},
                    {name: 'name', label: 'Nombre', sortable: true},
                    {name: 'rol', label: 'Rol', sortable: true},
                    {name: 'creado', label: 'Creado', sortable: true},
                    {name: 'actions', label: 'Acciones', sortable: true },
                ];
                break;
          case 'Propietarios':
          this.data = [
              {
                  id: Math.floor((Math.random() * 1000) + 1),
                  name: 'Jonathan Anaya',
                  rol: 'Agente',
                  creado: '05/09/2017'
              },
              {
                  id: Math.floor((Math.random() * 1000) + 1),
                  name: 'John Doe 1',
                  rol: 'Agente',
                  creado: '04/09/2017'
              },
              {
                  id: Math.floor((Math.random() * 1000) + 1),
                  name: 'John Doe 2',
                  rol: 'Agente',
                  creado: '03/09/2017'
              },
              {
                  id: Math.floor((Math.random() * 1000) + 1),
                  name: 'John Doe 3',
                  rol: 'Agente',
                  creado: '02/09/2017'
              }
          ];
          this.columns = [
              {name: 'id', label: '#', sortable: true},
              {name: 'name', label: 'Nombre', sortable: true},
              {name: 'cread0', label: 'Fecha de pago', sortable: true},
              {name: 'actions', label: 'Acciones', sortable: true },
          ];
                break;
          case 'Inmuebles':
          this.data = [
              {
                  id: Math.floor((Math.random() * 1000) + 1),
                  name: 'John Doe 3',
                  tipo: ['Casa', 'Terreno', 'Oficia'][Math.floor((Math.random() * 2) + 1)],
                  recamaras: Math.floor((Math.random() * 10) + 1),
                  super: Math.floor((Math.random() * 10000) + 1) +  ' m2',
                  precio: '$ ' + Math.floor((Math.random() * 10000) + 1),
              },
              {
                  id: Math.floor((Math.random() * 1000) + 1),
                  name: 'John Doe 3',
                  tipo: ['Casa', 'Terreno', 'Oficia'][Math.floor((Math.random() * 2) + 1)],
                  recamaras: Math.floor((Math.random() * 10) + 1),
                  super: Math.floor((Math.random() * 10000) + 1) +  ' m2',
                  precio: '$ ' + Math.floor((Math.random() * 10000) + 1),
              },
              {
                  id: Math.floor((Math.random() * 1000) + 1),
                  name: 'John Doe 3',
                  tipo: ['Casa', 'Terreno', 'Oficia'][Math.floor((Math.random() * 2) + 1)],
                  recamaras: Math.floor((Math.random() * 10) + 1),
                  super: Math.floor((Math.random() * 10000) + 1) +  ' m2',
                  precio: '$ ' + Math.floor((Math.random() * 10000) + 1),
              },
              {
                  id: Math.floor((Math.random() * 1000) + 1),
                  name: 'John Doe 3',
                  tipo: ['Casa', 'Terreno', 'Oficia'][Math.floor((Math.random() * 2) + 1)],
                  recamaras: Math.floor((Math.random() * 10) + 1),
                  super: Math.floor((Math.random() * 10000) + 1) +  ' m2',
                  precio: '$ ' + Math.floor((Math.random() * 10000) + 1),
              },
              {
                  id: Math.floor((Math.random() * 1000) + 1),
                  name: 'John Doe 3',
                  tipo: ['Casa', 'Terreno', 'Oficia'][Math.floor((Math.random() * 2) + 1)],
                  recamaras: Math.floor((Math.random() * 10) + 1),
                  super: Math.floor((Math.random() * 10000) + 1) +  ' m2',
                  precio: '$ ' + Math.floor((Math.random() * 10000) + 1),
              },
              {
                  id: Math.floor((Math.random() * 1000) + 1),
                  name: 'John Doe 3',
                  tipo: ['Casa', 'Terreno', 'Oficia'][Math.floor((Math.random() * 2) + 1)],
                  recamaras: Math.floor((Math.random() * 10) + 1),
                  super: Math.floor((Math.random() * 10000) + 1) +  ' m2',
                  precio: '$ ' + Math.floor((Math.random() * 10000) + 1),
              }
          ];
          this.columns = [
              {name: 'id', label: '#', sortable: true},
              {name: 'tipo', label: 'Tipo', sortable: true},
              {name: 'recamaras', label: 'Recamaras', sortable: true},
              {name: 'super', label: 'Super', sortable: true},
              {name: 'precio', label: 'Precio', sortable: true},
              {name: 'actions', label: 'Acciones', sortable: true },
          ];
                break;
          case 'Arrendatarios':
          this.data = [
              {
                  id: Math.floor((Math.random() * 1000) + 1),
                  name: 'Jonathan Anaya',
                  rol: 'Agente',
                  creado: '05/09/2017'
              },
              {
                  id: Math.floor((Math.random() * 1000) + 1),
                  name: 'John Doe 1',
                  rol: 'Agente',
                  creado: '04/09/2017'
              },
              {
                  id: Math.floor((Math.random() * 1000) + 1),
                  name: 'John Doe 2',
                  rol: 'Agente',
                  creado: '03/09/2017'
              },
              {
                  id: Math.floor((Math.random() * 1000) + 1),
                  name: 'John Doe 3',
                  rol: 'Agente',
                  creado: '02/09/2017'
              }
          ];
          this.columns = [
              {name: 'id', label: '#', sortable: true},
              {name: 'name', label: 'Nombre', sortable: true},
              {name: 'creado', label: 'Fecha de cobro', sortable: true},
              {name: 'actions', label: 'Acciones', sortable: true },
          ];
                break;
          case 'Proveedores':
          this.data = [
              {
                  id: Math.floor((Math.random() * 1000) + 1),
                  servicios: Math.floor((Math.random() * 10) + 1),
                  name: 'Jonathan Anaya',
                  rol: 'Agente',
                  creado: '05/09/2017'
              },
              {
                  id: Math.floor((Math.random() * 1000) + 1),
                  servicios: Math.floor((Math.random() * 10) + 1),
                  name: 'John Doe 1',
                  rol: 'Agente',
                  creado: '04/09/2017'
              },
              {
                  id: Math.floor((Math.random() * 1000) + 1),
                  servicios: Math.floor((Math.random() * 10) + 1),
                  name: 'John Doe 2',
                  rol: 'Agente',
                  creado: '03/09/2017'
              },
              {
                  id: Math.floor((Math.random() * 1000) + 1),
                  servicios: Math.floor((Math.random() * 10) + 1),
                  name: 'John Doe 3',
                  rol: 'Agente',
                  creado: '02/09/2017'
              }
          ];
          this.columns = [
              {name: 'id', label: '#', sortable: true},
              {name: 'name', label: 'Nombre', sortable: true},
              {name: 'servicios', label: 'Servicios pendientes', sortable: true},
              {name: 'actions', label: 'Acciones', sortable: true },
          ];
                break;

      }
      this.filteredData = this.data;
      this.filteredTotal = this.data.length;
  }

  _formatTitle = (title) => {
      title = title.split('/').join('');
      return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
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

}
