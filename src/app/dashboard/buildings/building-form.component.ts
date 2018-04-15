import { Component, OnInit, Inject, ViewChild, Pipe } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { Provider } from '../../shared/models';
import { BuildingService, CustomerService } from '../../shared/services';

@Component({
    selector: 'app-building-form',
    templateUrl: './building-form.component.html',
    styleUrls: ['./building-form.component.scss'],
    providers: [ BuildingService, CustomerService ]
})

export class BuildingFormComponent implements OnInit {
    public providers: Provider[];
    public filteredProviders: any[];

    constructor(
        @Inject(MD_DIALOG_DATA) public data: any,
        public dialogRef: MdDialogRef<BuildingFormComponent>,
        private _buildingService: BuildingService,
        private _customerService: CustomerService) {
          this._customerService.search('p', null)
                               .subscribe(res=>{
            if(res && res != null)
              this.providers = res.data.map(x=> new Provider(x));
            else this.providers = [];
          }, error=>{
            console.error(error);
          });
    }

    ngOnInit() {
    }

    onFilesChange(fileList: File[]) {


        if(!Array.isArray(fileList) || fileList.length  == 0)
            alert('Hubo un error al cargar el archivo')
        else {
            let formData = new FormData();
            let file = fileList[0];
            formData.append('image', file, file.name);
            this._buildingService.uploadImage(this.data.building.id, formData).subscribe(result => {
                this.data.building.images.push(result.data);
            });
        }
    }


    displayRenter(val: any) {
      return val ? val.full_name : val;
    }

    filterProviders(val: string){
      if(!val || val == null) this.filteredProviders = this.providers;
      if(!this.filteredProviders || this.providers == null) this.filteredProviders = this.providers;
      else this.filteredProviders = this.providers.filter(r => { return new RegExp(val, 'gi').test(r.full_name); });
    }

    deleteImage(id: number) {
        if(!confirm('Estás seguro que deseas eliminar esta imagen'))
            return;

        this._buildingService.destroyImage(id).subscribe(result => {
            this.data.building.images = this.data.building.images.filter(item => {
                return item.id != id
            });
        });
    }
}
