import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ChatComponent } from '../chat/chat.component';

export const mainRoutes: Routes = [
    { 
        path: 'main', 
        component: MainComponent,
        pathMatch: 'prefix',
        
        children: [
            { path: '', redirectTo: 'chat', pathMatch: 'full'},
            { path: 'chat', component: ChatComponent }
        ]
    }
];