import { Component, OnInit, Inject, ViewChild, Pipe } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialogRef } from '@angular/material';
import { BuildingService } from '../../shared/services/building.service';

@Component({
    selector: 'app-building-form',
    templateUrl: './building-form.component.html',
    styleUrls: ['./building-form.component.scss'],
    providers: [ BuildingService ]
})

export class BuildingFormComponent implements OnInit {
    constructor(
        @Inject(MD_DIALOG_DATA) public data: any,
        public dialogRef: MdDialogRef<BuildingFormComponent>,
        private _buildingService: BuildingService) {
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
