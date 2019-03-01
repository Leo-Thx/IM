/**
 * 顶级共享路由配置 
 * 其他模块或惰性模块在自己对应的模块进行配置
 */

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from '../app.component';

const appRoutes: Routes = [
    // {path: '', component: AppComponent, pathMatch: 'full'}
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

