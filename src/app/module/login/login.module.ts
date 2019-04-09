import { NgModule } from '@angular/core';
import { LoginService } from './login.service';
import { RouterModule } from '@angular/router';
import { loginRoutes } from './login.routing';
import { LoginComponent } from './login.component';
import { ShareModule } from 'src/app/share/share.module';
import { StoreModule } from '@ngrx/store';
import { loginStateReducer } from 'src/app/ngstore/login/login.reducer';

@NgModule({
    imports: [ 
        RouterModule.forChild(loginRoutes), 
        ShareModule,
        StoreModule.forFeature('loginState', loginStateReducer)
    ],
    providers: [ LoginService ],
    declarations: [ LoginComponent ],
    exports: []
})
export class LoginModule {
    constructor() {}
}
