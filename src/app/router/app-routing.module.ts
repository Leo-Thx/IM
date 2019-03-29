/**
 * 顶级共享路由配置 
 * 其他模块或惰性模块在自己对应的模块进行配置
 * 
 */

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';


const appRoutes: Routes = [
    // {path: '', redirectTo: 'layout/chat', pathMatch: 'full'},
    {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: environment.production === true }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouterModule {
    constructor() {}
}

