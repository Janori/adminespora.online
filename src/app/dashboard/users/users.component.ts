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

import { routerAnimation } from '../../utils/page.animation';
import { User } from '../../shared/models';
import { UserService } from '../../shared/services';
import { UserFormComponent } from './user-form.component';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: [routerAnimation],
    providers: [ UserService ]
})

export class UsersComponent implements OnInit {
    public title: string;

    constructor(private _userService: UserService,
                private _router:Router,
                private _dataTableService: TdDataTableService,
                private _snackBar: MdSnackBar,
                public dialog: MdDialog) {

                    this.title = 'Usuarios';

        this.columns = [
            {name: 'id', label: '#', sortable: true},
            {name: 'full_name', label: 'Nombre', sortable: true},
            {name: 'role.name', label: 'Rol', sortable: true},
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
      this.getUsers();
    this.filter();
  }

  getUsers = () => {
      this._userService.getAll().subscribe(result => {
          this.data = [];

          let users = result.data;
              users.forEach(user => this.data.push(new User(user)));

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

  editUser = (user?: User) => {
      const dialogRef = this.dialog.open(UserFormComponent, {
          width: '700px',
          data: {
              user: user,
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

  deleteUser = (row: any) => {
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
