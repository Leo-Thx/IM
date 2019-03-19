import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouterModule } from './router/app-routing.module';
import { ShareModule } from './share/share.module';
import { networkConfig } from './config/network.config';
import { LoginModule } from './login/login.module';
import { ChatModule } from './module/chat/chat.module';
import { MaterialShareModule } from './share-material/shareMaterial.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        MaterialShareModule,                    // UI共享模块
        ShareModule.forRoot(networkConfig),     // 唯一网络服务

        LoginModule,            
        ChatModule,

        AppRouterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { 
    constructor() {}
}
