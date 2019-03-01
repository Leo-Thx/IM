import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouterModule } from './router/app-routing.module';
import { ShareModule } from './share/share.module';
import { networkConfig } from './config/network.config';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRouterModule,
        ShareModule.forRoot(networkConfig)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { 
    constructor() {}
}
