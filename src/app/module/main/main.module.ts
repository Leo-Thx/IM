import { NgModule } from "@angular/core";
import { ShareModule } from 'src/app/share/share.module';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './main.routing';
import { SideNavComponent } from './sidenav/sidenav.component';
import { PublicComponentModule } from '../public/public.module';

@NgModule({
    imports: [
        RouterModule.forChild(mainRoutes),
        ShareModule,
        PublicComponentModule
    ],
    declarations: [
        MainComponent,
        SideNavComponent
    ]
})
export class MainMoule{}
