import { Component, Input } from "@angular/core";
import { MsgImageType } from 'src/app/model/msgType/ImageType';

@Component({
    template: `
    <span class="title block" [ngClass]="dirClass">你的名字<span class="time ml-1">12-03-12</span></span>
    <div class="content p-mn-5" [ngClass]="dirClass">
        <img src="./assets/login/top.jpeg" />
    </div>
    `,
    styleUrls: ['./ChatImgMsg.scss']
})
export class ChatImgMsgComponent{
    @Input('direction') public direction: string; 
    @Input('dirClass') public dirClass: Object;

    @Input() public data: MsgImageType;
}

