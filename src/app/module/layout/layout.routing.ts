import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { SideNavComponent } from './sidenav/sidenav.component';
import { ChatComponent } from '../chat/chat.component';

export const layoutRoutes: Routes = [
    {
        path: 'layout', 
        component: LayoutComponent, 
        pathMatch: 'prefix',
        
        children: [
            // { path: '', component: SideNavComponent, pathMatch: 'full', outlet: 'sidenav' },
            { path: 'chat', component: ChatComponent }
        ]
    }
];