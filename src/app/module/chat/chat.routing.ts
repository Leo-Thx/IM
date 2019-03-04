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
        outlet: 'chat',
        children: [
            { path: 'chatList', component: ChatListComponent, pathMatch: 'full', outlet: 'chatList' },
            { path: 'chatMain', component: ChatMainComponent, pathMatch: 'full', outlet: 'chatMain' },
            { path: 'chatInput', component: ChatInputComponent, pathMatch: 'full', outlet: 'chatInput' }
        ]
    }
];
