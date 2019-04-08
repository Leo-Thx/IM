import { Component } from "@angular/core";
import { MatDialog } from '@angular/material';
import { ConcatsAddDialogComponet } from '../concats-add/concats-add.component';

@Component({
    selector: 'app-concats-main',
    templateUrl: './concats-main.html',
    styleUrls: [
        './concats-main.scss'
    ]
})
export class ConcatsMainComponent{
    public listArray = Array.from({length: 15}).fill(1);
    public statusArray = ['All', 'Online', 'Offline'];
    public activeStatus = 'All';

    public constructor(public dialog: MatDialog){

    }

    public searchListWithStatus(status:'All'| 'Online' | 'Offline'){
        this.activeStatus = status;
    }

    public addConcats($event){
        let dialogRef = this.dialog.open(ConcatsAddDialogComponet, {
            data: {
                animal: 'panda'
            },
            width: '400px',
            height: '300px',
            autoFocus: false,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result=>{
            console.info('result : ', result);
        });
    }
}
