import { NgModule } from '@angular/core';
import { LoginService } from './login.service';
import { RouterModule } from '@angular/router';
import { loginRoutes } from './login.routing';
import { LoginComponent } from './login.component';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
    imports: [ 
        RouterModule.forChild(loginRoutes), 
        ShareModule
    ],
    providers: [ LoginService ],
    declarations: [ LoginComponent ],
    exports: []
})
export class LoginModule {
    constructor() {}
}
