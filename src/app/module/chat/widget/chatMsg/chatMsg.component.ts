import { Component, Input, OnChanges, SimpleChanges, ViewChild, OnInit, ComponentFactoryResolver, TemplateRef } from "@angular/core";
import { MsgTypeEnum } from 'src/app/config/app.enum';
import { BaseMsgType } from 'src/app/model/msgType/BaseMsgType';
import { ChatTextMsgComponent } from './text/ChatTextMsg.component';
import { ChatMsgRenderDirective } from './chatMsgRender.directive';
import { MsgTextType } from 'src/app/model/msgType/TextType';
import { IMsgTypeCof } from 'src/app/model/msgType/config';

@Component({
    selector: 'app-chat-msg',
    templateUrl: './chatMsg.component.html',
    styleUrls: [
        './chatMsg.component.scss'
    ]
})
export class ChatMsgComponent <T extends BaseMsgType> implements OnChanges, OnInit{
    // 类型
    @Input('type') public type: MsgTypeEnum;
    // 具体的数据
    @Input('data') public msgInstance: T & BaseMsgType;
    // 方向：左或右
    @Input('direction') public direction: string;   
    // 渲染指令
    @ViewChild(ChatMsgRenderDirective) chatMsgDirective: ChatMsgRenderDirective;

    public currentMsgClass = {};

    constructor(
        public componentFactoryResolver: ComponentFactoryResolver
    ) {
        
    }

    ngOnChanges(changes: SimpleChanges) {}

    ngOnInit(){
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ChatTextMsgComponent);
        let viewContainerRef = this.chatMsgDirective.viewContainerRef;
        
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        // console.info(componentRef.instance);
        componentRef.instance.data = MsgTextType.create({

        } as IMsgTypeCof);
        componentRef.instance.direction = this.direction;

        this.currentMsgClass = {
            left: this.direction === 'left',
            right: this.direction === 'right'
        };
    }
}
