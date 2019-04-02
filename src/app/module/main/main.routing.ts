import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ChatComponent } from '../chat/chat.component';
import { ConcatsMainComponent } from '../concats/concats-main/concats-main.component';
import { MusicMainComponent } from '../music/music-main/music-main.component';
import { ScheduleMainComponent } from '../schedule/schedule-main/schedule-main.component';
import { EmailMainComponent } from '../email/email-main/email-main.component';

export const mainRoutes: Routes = [
    { 
        path: 'main', 
        component: MainComponent,
        pathMatch: 'prefix',
        
        children: [
            { path: '', redirectTo: 'chat', pathMatch: 'full'},
            { path: 'chat', component: ChatComponent },
            { path: 'concats', component: ConcatsMainComponent},
            { path: 'schedule', component: ScheduleMainComponent},
            { path: 'email', component: EmailMainComponent},
            { path: 'music', component: MusicMainComponent},
        ]
    }
];