import { NgModule } from "@angular/core";
import { ShareModule } from 'src/app/share/share.module';
import { PublicComponentModule } from '../public/public.module';
import { ConcatsMainComponent } from './concats-main/concats-main.component';
import { ConcatsAddDialogComponet } from './concats-add/concats-add.component';

@NgModule({
    imports: [
        ShareModule,
        PublicComponentModule
    ],
    declarations: [
        ConcatsMainComponent,
        ConcatsAddDialogComponet
    ],
    entryComponents: [
        ConcatsAddDialogComponet
    ]
})
export class ConcatsModule{}
