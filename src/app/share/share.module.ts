import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpClientXsrfModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NetworkService } from './network/network.service';
import { networkFactory } from './network/network.service.provider';
import { INetworkConfig } from './network/network.config';
import { httpInterceptorProviders } from './http-interceptors';
import { AuthService } from './service/Auth.service';
import { HttpLogService } from './service/HttpLog.service';
import { HttpCacheService } from './service/HttpCache.service';
import { HttpUploaderService } from './service/Uploader.service';
import { ShareMaterialModule } from '../material-module';

import { IpcService } from './ipc/Ipc.service';
import { GlobalService } from './global/global.service';


/**
 * 共享模块 [todo:测试惰性模块加载此模块会不会报错]
 */
@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,                   // 拦截器与引入HttpClientModule在同一个位置
        HttpClientXsrfModule.withOptions({  // 自定义XSRF攻击名字
            cookieName: 'My-Xsrf-Cookie',
            headerName: 'My-Xsrf-Header',
        })
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ShareMaterialModule
    ],
    providers: [
        AuthService,
        HttpLogService,
        HttpCacheService,
        HttpUploaderService,
        
        httpInterceptorProviders
    ]
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
                // 网络服务
                { provide: INetworkConfig, useValue: nwConfig },
                { provide: NetworkService, useFactory: networkFactory, deps: [ INetworkConfig, HttpClient ] },

                // ipc服务
                { provide: IpcService, useClass: IpcService },

                // 全局服务
                { provide: GlobalService, useClass: GlobalService}
            ]
        };
    }
}

