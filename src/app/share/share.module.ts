import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NetworkService } from './network/network.service';
import { networkFactory } from './network/network.service.provider';
import { INetworkConfig } from '../config/network.config';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule
    ],
    providers: []
})
export class ShareModule {
    /**
     * 模块初次加载 根注入器是没有该模块的，保证该模块只会加载一次
     * @param parentModule ''
     */
    constructor( @Optional() @SkipSelf() parentModule: ShareModule) {
        if ( parentModule ) {
            throw new Error("ShareModule was already import by AppModule!");
        }
    }
    
    /**
     * 模块初始化时由根模块进行加载
     * @param nwConfig 网络配置
     */
    static forRoot( nwConfig: INetworkConfig ): ModuleWithProviders {
        return {
            ngModule: ShareModule,
            providers: [
                { provide: INetworkConfig, useValue: nwConfig },
                { provide: NetworkService, useFactory: networkFactory, deps: [ INetworkConfig, HttpClient ] }
            ]
        };
    }
}