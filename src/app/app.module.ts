import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouterModule } from './router/app-routing.module';
import { ShareModule } from './share/share.module';
import { networkConfig } from './share/network/network.config';
import { LoginModule } from './login/login.module';
import { ShareMaterialModule } from './material-module';
import { LayoutModule } from './module/layout/layout.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        ShareMaterialModule,                    // UI共享模块
        ShareModule.forRoot(networkConfig),     // 唯一网络服务

        LoginModule,  
        LayoutModule,

        AppRouterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { 
    constructor() {}
}
