import { Component, OnInit, Inject, Input } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
import { ChatInputService } from './chat-input.service';
import { MatIconRegistry } from '@angular/material';


const menus = [
    // sentiment_satisfied_alt, insert_emoticon
    {icon: 'face', value:'emoji', name: '表情'},
    // {icon: 'add_photo_alternate', value:'image', name: '图片' },
    // {icon: 'note_add', value:'file', name: '文件'},
    // {icon: 'waves', value:'shake', name: '发送窗口抖动'},
    // {icon: 'crop', value:'cut', name: '截图'},
    // {icon: 'email', value:'email', name: '发送邮件'},
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
    @Input('chatId') public chatRoomId;

    public menus: Array<any> = menus;
    constructor( private chatInputSvc: ChatInputService, 
        iconRegistry: MatIconRegistry, 
        sanitizer: DomSanitizer ) {
            // 这里考虑是否需要进行数据缓存
            // iconRegistry.addSvgIcon('send_input',  
                // sanitizer.bypassSecurityTrustResourceUrl('assets/svg/chat/send_input.svg'));
                
            // iconRegistry.addSvgIcon('folder_input',
                // sanitizer.bypassSecurityTrustResourceUrl('assets/svg/chat/folder_input.svg'));
        }

    ngOnInit() {}
}
