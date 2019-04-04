import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouterModule } from './router/app-routing.module';
import { ShareModule } from './share/share.module';
import { networkConfig } from './share/network/network.config';
import { ShareMaterialModule } from './material-module';
import { LayoutModule } from './module/layout/layout.module';
import { PublicComponentModule } from './module/public/public.module';
import { StoreModule } from '@ngrx/store';
import { loginStateReducer } from './ngstore/login/loginState.reducer';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        StoreModule.forRoot({
            loginState: loginStateReducer
        }),

        ShareMaterialModule,                    // UI共享模块
        ShareModule.forRoot(networkConfig),     // 唯一网络服务

        LayoutModule,
        PublicComponentModule,

        AppRouterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { 
    constructor() {}
}
