import { Component, AfterViewInit, ViewChildren, QueryList } from "@angular/core";
import { ChatListService } from './chat-list.service';
import { MatListItem } from '@angular/material';

@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: [
        './chat-list.component.scss'
    ],
    providers: [ChatListService]
})
export class ChatListComponent implements AfterViewInit{
    public listArray = Array.from({length: 15}).fill(1);
    public messages = Array.from({length: 1}).fill({from:'from', subject:'subject', content:'content'});

    @ViewChildren('matListItem') public matListItem: QueryList<MatListItem>;

    constructor(private chatlistSvc: ChatListService) {

    }

    ngAfterViewInit(){
        // for(let matItem of this.matListItem.toArray() ){
        //     let hostEle = matItem._getHostElement(),
        //         firstEle = hostEle.firstElementChild;
        //     if( firstEle instanceof HTMLDivElement ) firstEle.style.padding="0 8px";
        // }
    }
}
