/**
 * 顶级共享路由配置 
 * 其他模块或惰性模块在自己对应的模块进行配置
 * 
 */

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouterModule {
    constructor() {}
}

