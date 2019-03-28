import { Component, OnInit } from "@angular/core";
import { ChatInputService } from './chat-input.service';


const menus = [
    // sentiment_satisfied_alt, insert_emoticon
    {icon: 'face', value:'emoji', name: '表情'},
    {icon: 'insert_photo', value:'image', name: '图片' },
    {icon: 'insert_drive_file', value:'file', name: '文件'},
    {icon: 'email', value:'shake', name: '发送窗口抖动'},
    {icon: 'crop', value:'cut', name: '截图'},
    {icon: 'email', value:'email', name: '发送邮件'},
    {icon: 'send', value:'send', name: '发送消息', last: true}
];

@Component({
    selector: 'app-chat-input',
    templateUrl: './chat-input.component.html',
    styleUrls: [
        './chat-input.component.scss'
    ],
    providers: [ ChatInputService ]
})
export class ChatInputComponent implements OnInit {
    public menus: Array<any> = menus;
    constructor( private chatInputSvc: ChatInputService ) {}
    ngOnInit() {}
}
