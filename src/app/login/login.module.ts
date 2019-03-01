import { NgModule } from '@angular/core';
import { LoginService } from './login.service';
import { RouterModule, Routes} from '@angular/router';
import { loginRoutes } from './login.routing';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [ RouterModule.forChild(loginRoutes) ],
    providers: [ LoginService ],
    declarations: [ LoginComponent ],
    exports: [ LoginComponent ]
})
export class LoginModule {
    constructor() {}
}
