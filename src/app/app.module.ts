import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouterModule } from './router/app-routing.module';
import { ShareModule } from './share/share.module';
import { networkConfig } from './config/network.config';
import { LoginModule } from './login/login.module';
import { ChatModule } from './module/chat/chat.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        ShareModule.forRoot(networkConfig),

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
