import { Component, Input, OnInit } from "@angular/core";
import { MsgTextType } from 'src/app/model/msgType/TextType';

@Component({
    template : `
    <span class="title block" [ngClass]="dirClass">你的名字<span class="time ml-1">12-03-12</span></span>
    <div class="content p-sm-3 mt-sm-1" [ngClass]="dirClass">
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
    </div>
    `,
    styleUrls: ['./ChatTextMsg.scss']
})
export class ChatTextMsgComponent implements OnInit{
    @Input() data: MsgTextType;
    @Input('direction') public direction: string; 
    @Input('dirClass') public dirClass: Object;

    constructor() {}
    ngOnInit(){}
}

