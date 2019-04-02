import { Component, Input, OnChanges, SimpleChanges, ViewChild, OnInit, ComponentFactoryResolver, TemplateRef, Type } from "@angular/core";
import { MsgTypeEnum } from 'src/app/config/app.enum';
import { BaseMsgType } from 'src/app/model/msgType/BaseMsgType';
import { ChatTextMsgComponent } from './text/ChatTextMsg.component';
import { ChatMsgRenderDirective } from './chatMsgRender.directive';
import { MsgTextType } from 'src/app/model/msgType/TextType';
import { IMsgTypeCof } from 'src/app/model/msgType/config';
import { ChatImgMsgComponent } from './image/ChatImgMsg.component';
import { ChatFileMsgComponent } from './file/ChatFileMsg.component';

type MsgInterfaceType<T extends BaseMsgType> = T & BaseMsgType;
type ChatMsgType = ChatTextMsgComponent | ChatImgMsgComponent | ChatFileMsgComponent;

const _msgTypeMap: Map<MsgTypeEnum, Type<ChatMsgType>> = new Map;
_msgTypeMap.set(MsgTypeEnum.TEXT, ChatTextMsgComponent);
_msgTypeMap.set(MsgTypeEnum.IMAGE, ChatImgMsgComponent);
_msgTypeMap.set(MsgTypeEnum.FILE, ChatFileMsgComponent);


@Component({
    selector: 'app-chat-msg',
    templateUrl: './chatMsg.component.html',
    styleUrls: [
        './chatMsg.component.scss'
    ]
})
export class ChatMsgComponent <T extends BaseMsgType> implements OnInit{
    // 渲染指令
    @ViewChild(ChatMsgRenderDirective) chatMsgDirective: ChatMsgRenderDirective;

    // 类型
    @Input('type') public type: MsgTypeEnum;
    // 具体的数据
    @Input('data') public msgInstance: MsgInterfaceType<T>;
    
    // 方向：左或右
    @Input('direction')
    set direction(direction: string){
        this.directionClass = {
            left: direction === 'left',
            right: direction === 'right'
        };
        this.dir = direction;
    }
    public dir: string;

    public currentMsgClass = {};
    public directionClass = {};

    // DI?
    public msgTypeMap = _msgTypeMap;

    constructor(public componentFactoryResolver: ComponentFactoryResolver) {}

    ngOnInit(){
        let component = this.msgTypeMap.get(this.type),
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(component),
            viewContainerRef = this.chatMsgDirective.viewContainerRef;
        
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);

        componentRef.instance.data = MsgTextType.create({} as IMsgTypeCof);
        componentRef.instance.direction = this.direction;
        componentRef.instance.dirClass = this.directionClass;
    }
}
