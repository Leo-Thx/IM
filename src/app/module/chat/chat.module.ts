import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

import { ChatComponent } from './chat.component';
import { ChatService } from './chat.service';

import { chatRoutes } from './chat.routing';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatMainComponent } from './chat-main/chat-main.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
    declarations: [ 
        ChatComponent, 
        ChatListComponent, 
        ChatMainComponent, 
        ChatInputComponent 
    ],
    providers: [ ChatService ],
    imports: [ 
        // RouterModule.forChild(chatRoutes),
        ShareModule
    ],
    exports: [
        // ChatListComponent,
        // ChatMainComponent,
        // ChatInputComponent
    ]
})
export class ChatModule {
    constructor() {}
}
