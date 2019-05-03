import { Component } from "@angular/core";

@Component({
    selector: 'app-chatList-menu',
    template: `<div>
        <ul class="m-0 pl-0">
            <li>查看资料</li>
            <li>消息记录</li>
            <li>发送邮件</li>
            <li>分享名片</li>
            <li>删除会话</li>
        </ul>
    </div>`,
    styleUrls: ['./list-context.scss']
})
export class ChatListContextMenu {
    
}
