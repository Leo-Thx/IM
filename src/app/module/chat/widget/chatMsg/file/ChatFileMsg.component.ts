import { Component, Input } from "@angular/core";
import { MsgFileType } from 'src/app/model/msgType/FileType';

@Component({
    template: `
    <span class="title block" [ngClass]="dirClass">你的名字<span class="time ml-1">12-03-12</span></span>
    <div class="flex p-mn-5 content" [ngClass]="dirClass">
        <button class="attachment" mat-icon-button>
            <mat-icon>insert_drive_file</mat-icon>
        </button>
        <div class="detail ml-1">
            <h5 class="m-0">Tenacy Agreement.pdf</h5>
            <span>24kb Document</span>
        </div>
    </div>
    `,
    styleUrls: ['./ChatFileMsg.scss']
})
export class ChatFileMsgComponent {
    @Input('direction') public direction: string; 
    @Input('dirClass') public dirClass: Object;

    @Input() public data: MsgFileType;

    constructor() {}
}
