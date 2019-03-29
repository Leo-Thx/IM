import { NgModule } from "@angular/core";
import { AvatarComponent } from './avatar/avatar.component';
import { AppTopBarComponent } from './appbar/appbar.component';
import { ShareMaterialModule } from 'src/app/material-module';
import { CommonModule } from '@angular/common';


@NgModule({
    imports: [
        CommonModule,
        ShareMaterialModule
    ],
    declarations: [
        AvatarComponent,
        AppTopBarComponent,
    ],
    exports: [
        AppTopBarComponent,
        AvatarComponent
    ]
})
export class PublicComponentModule {
    constructor() {}
}
