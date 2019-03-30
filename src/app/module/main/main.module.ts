import { NgModule } from "@angular/core";
import { ShareModule } from 'src/app/share/share.module';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './main.routing';
import { SideNavComponent } from './sidenav/sidenav.component';

@NgModule({
    imports: [
        RouterModule.forChild(mainRoutes),
        ShareModule
    ],
    declarations: [
        MainComponent,
        SideNavComponent
    ]
})
export class MainMoule{}
