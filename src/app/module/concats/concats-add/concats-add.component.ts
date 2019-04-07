import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    templateUrl: './concats-add.html',
    styleUrls: ['./concats-add.scss']
})
export class ConcatsAddDialogComponet{
    public constructor(
        @Inject(MAT_DIALOG_DATA) public data: any, 
        public dialogRef: MatDialogRef<ConcatsAddDialogComponet>){
        
        console.info(data);
    }
}
