import { Component, Input, OnInit } from "@angular/core";
import { MsgTextType } from 'src/app/model/msgType/TextType';

@Component({
    template : `
    <span class="title block" [ngClass]="dirClass">你的名字<span class="time ml-1">12-03-12</span></span>
    <div class="content p-mn-5" [ngClass]="dirClass">
        这是今天的工作任务，你们部门自行安排一下，这里有整个部门的工作，还有今天下午有一个会需要你们部门的人过来一下，我们聊一下下一个项目的细节，
        然后讨论一些问题，和项目使用的时间，还有其他的问题，解释下一个项目的细节解释下一个项目的细节项目
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

