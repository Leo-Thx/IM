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
import { ChatImgMsgComponent } from './widget/chatMsg/image/ChatImgMsg.component';
import { ChatFileMsgComponent } from './widget/chatMsg/file/ChatFileMsg.component';
import { ChatListContextMenu } from './widget/menu/list-context.component';
import { PortalChildComponent } from './PortalChildComponent';
import { PortalDomComponent } from './PortalDomComponent';
import { PortalTemplateComponent } from './PortalTempComponent';
import { OverlayPanelComponent } from './OverlayPanelComponent';
import { CdkOverlayComponent } from './CdkOverlayComponent';
import { SingleInfoDialog } from './widget/info/SingleInfoDialog.component';

@NgModule({
    declarations: [ 
        ChatComponent, 
        ChatListComponent, 
        ChatMainComponent, 
        ChatInputComponent,
        
        ChatMsgComponent,
        ChatTextMsgComponent,
        ChatImgMsgComponent,
        ChatFileMsgComponent,
        ChatMsgRenderDirective,

        ChatListContextMenu,
        SingleInfoDialog,

        PortalChildComponent,
        PortalDomComponent,
        PortalTemplateComponent,
        OverlayPanelComponent,
        CdkOverlayComponent,
    ],
    providers: [ ChatService ],
    imports: [ 
        // RouterModule.forChild(chatRoutes),
        ShareModule,
        PublicComponentModule
    ],
    exports: [],
    entryComponents: [
        ChatTextMsgComponent,
        ChatImgMsgComponent,
        ChatFileMsgComponent,

        ChatListContextMenu,
        SingleInfoDialog,

        
        PortalChildComponent,
        PortalDomComponent,
        PortalTemplateComponent,

        OverlayPanelComponent,
        CdkOverlayComponent,
    ]
})
export class ChatModule {
    constructor() {}
}
