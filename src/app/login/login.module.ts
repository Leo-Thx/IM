import { NgModule } from '@angular/core';
import { LoginService } from './login.service';
import { RouterModule, Routes} from '@angular/router';
import { loginRoutes } from './login.routing';
import { LoginComponent } from './login.component';
import { ShareMaterialModule } from '../material-module';

@NgModule({
    imports: [ RouterModule.forChild(loginRoutes), ShareMaterialModule ],
    providers: [ LoginService ],
    declarations: [ LoginComponent ],
    exports: [ LoginComponent ]
})
export class LoginModule {
    constructor() {}
}
