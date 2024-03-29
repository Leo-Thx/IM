import { NgModule } from "@angular/core";
import { ShareModule } from 'src/app/share/share.module';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './main.routing';
import { SideNavComponent } from './sidenav/sidenav.component';
import { PublicComponentModule } from '../public/public.module';
import { SingleRightDrawerComponent } from '../chat/widget/info/SingleRightDrawer.component';
import { PersonInfoLeftDrawerComponent } from './drawer/PersonInfoLeftDrawer.component';
import { GroupRightDrawerComponnet } from '../chat/widget/info/GroupRightDrawer.component';

@NgModule({
    imports: [
        RouterModule.forChild(mainRoutes),
        ShareModule,
        PublicComponentModule
    ],
    declarations: [
        MainComponent,
        SideNavComponent,

        SingleRightDrawerComponent,
        PersonInfoLeftDrawerComponent,
        GroupRightDrawerComponnet
    ],
    entryComponents: [
        SingleRightDrawerComponent,
        GroupRightDrawerComponnet
    ]
})
export class MainMoule{}
