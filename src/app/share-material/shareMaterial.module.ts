import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';

/**
 * google-UI框架共享模块
 */

@NgModule({
    exports: [ MatButtonModule ]
})
export class MaterialShareModule {
    constructor() {}
}
