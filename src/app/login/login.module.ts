import { NgModule } from '@angular/core';
import { LoginService } from './login.service';
import { RouterModule } from '@angular/router';
import { loginRoutes } from './login.routing';
import { LoginComponent } from './login.component';
import { ShareModule } from '../share/share.module';
import { PublicComponentModule } from '../module/public/public.module';

@NgModule({
    imports: [ 
        RouterModule.forChild(loginRoutes), 
        ShareModule,
        PublicComponentModule
    ],
    providers: [ LoginService ],
    declarations: [ LoginComponent ],
    exports: []
})
export class LoginModule {
    constructor() {}
}
