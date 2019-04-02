import { Component, Input } from "@angular/core";
import { MsgImageType } from 'src/app/model/msgType/ImageType';

@Component({
    template: `
    <span class="title block" [ngClass]="dirClass">你的名字</span>
    <div class="content p-1 mt-sm-1" [ngClass]="dirClass">
        图片
    </div>
    `,
    styleUrls: ['./ChatImgMsg.scss']
})
export class ChatImgMsgComponent{
    @Input('direction') public direction: string; 
    @Input('dirClass') public dirClass: Object;

    @Input() public data: MsgImageType;
}

