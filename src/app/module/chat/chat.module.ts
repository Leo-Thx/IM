import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

import { ChatComponent } from './chat.component';
import { ChatService } from './chat.service';

import { chatRoutes } from './chat.routing';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatMainComponent } from './chat-main/chat-main.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ShareModule } from 'src/app/share/share.module';
import { PublicComponentModule } from '../public/public.module';
import { ChatMsgComponent } from './widget/chatMsg/chatMsg.component';
import { ChatTextMsgComponent } from './widget/chatMsg/text/ChatTextMsg.component';
import { ChatMsgRenderDirective } from './widget/chatMsg/chatMsgRender.directive';

@NgModule({
    declarations: [ 
        ChatComponent, 
        ChatListComponent, 
        ChatMainComponent, 
        ChatInputComponent,
        ChatMsgComponent,
        ChatTextMsgComponent,
        ChatMsgRenderDirective
    ],
    providers: [ ChatService ],
    imports: [ 
        RouterModule.forChild(chatRoutes),
        ShareModule,
        PublicComponentModule
    ],
    exports: [
        // ChatListComponent,
        // ChatMainComponent,
        // ChatInputComponent
    ],
    entryComponents: [
        ChatTextMsgComponent
    ]
})
export class ChatModule {
    constructor() {}
}
