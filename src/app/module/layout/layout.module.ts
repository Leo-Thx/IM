import { NgModule } from "@angular/core";
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { ShareModule } from 'src/app/share/share.module';
import { layoutRoutes } from './layout.routing';
import { SideNavComponent } from './sidenav/sidenav.component';
import { ChatModule } from '../chat/chat.module';
import { PublicComponentModule } from '../public/public.module';

@NgModule({
    imports: [ 
        RouterModule.forChild(layoutRoutes), 
        ShareModule,
        PublicComponentModule,
        ChatModule
    ],
    declarations: [
        LayoutComponent,
        SideNavComponent,
    ],
    exports: [ LayoutComponent ]
})
export class LayoutModule {}
