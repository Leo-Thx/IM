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
    public listArray = Array.from({length: 10}).map((v,i)=>{
        return {
            chatId: i + 1,
            isGroup: i>1,
            url: './assets/login/top.jpeg',
            urls: Array.from({length: i>4?4: i}).fill('./assets/login/top.jpeg')
        }
    });

    public statusArray = ['全部', '在线', '离线', '群组'];
    public statusIndex = 0;
    
    public activeIndex = -1;
    public selectedItem : any = null;
    public isGroup: boolean = false;

    public constructor(public dialog: MatDialog){}

    public searchListWithStatus(index: number){
        this.statusIndex = index;
    }
    
    public selectItem(index, item){
        this.activeIndex = index;
        this.selectedItem = item;
        this.isGroup = Boolean(item.isGroup);
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
