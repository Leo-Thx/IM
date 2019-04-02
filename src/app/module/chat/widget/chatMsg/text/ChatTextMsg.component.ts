import { Component, Input, OnInit, ViewChild, TemplateRef, SkipSelf, Host, AfterViewInit, ComponentRef } from "@angular/core";
import { MsgTextType } from 'src/app/model/msgType/TextType';

@Component({
    template : `
    <span class="title block" [ngClass]="currentClasses">你的名字</span>
    <div class="content p-1 mt-sm-1" [ngClass]="currentClasses">
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
    </div>
    `,
    styleUrls: ['./ChatTextMsg.scss']
})
export class ChatTextMsgComponent implements OnInit{
    @Input() data: MsgTextType;
    @Input('direction') public direction: string; 

    public currentClasses = {};
    constructor() {}

    ngOnInit(){
        this.currentClasses = {
            left: this.direction === 'left',
            right: this.direction === 'right'
        };
    }
}

