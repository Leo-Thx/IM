import { Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatMainComponent } from './chat-main/chat-main.component';
import { ChatInputComponent } from './chat-input/chat-input.component';

export const chatRoutes: Routes = [
    {
        path: 'chat', 
        component: ChatComponent, 
        pathMatch: 'full',
        children: [
            { path: '', component: ChatListComponent, pathMatch: 'full', outlet: 'chatList' },
            { path: '', component: ChatMainComponent, pathMatch: 'full', outlet: 'chatMain' },
            { path: '', component: ChatInputComponent, pathMatch: 'full', outlet: 'chatInput' }
        ]
    }
];
