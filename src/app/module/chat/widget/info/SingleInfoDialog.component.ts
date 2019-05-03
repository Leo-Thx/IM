import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
    name: string;
}

@Component({
    selector: 'app-single-info-dialog',
    templateUrl: './SingleInfoDialog.html',
    styleUrls: [
        './SingleInfoDialog.scss'
    ]
})
export class SingleInfoDialog {
    constructor(
        public dialogRef: MatDialogRef<SingleInfoDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData){
            console.info(this.data);
        }
}
