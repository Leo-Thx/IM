import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

import { ChatComponent } from './chat.component';
import { ChatService } from './chat.service';

import { chatRoutes } from './chat.routing';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatMainComponent } from './chat-main/chat-main.component';
import { ChatInputComponent } from './chat-input/chat-input.component';

@NgModule({
    declarations: [ ChatComponent, ChatListComponent, ChatMainComponent, ChatInputComponent ],
    providers: [ ChatService ],
    imports: [ RouterModule.forChild(chatRoutes) ],
    exports: []
})
export class ChatModule {
    constructor() {}
}
