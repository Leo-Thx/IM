import { NgModule } from "@angular/core";
import { ShareModule } from 'src/app/share/share.module';
import { PublicComponentModule } from '../public/public.module';
import { EmailMainComponent } from './email-main/email-main.component';

@NgModule({
    imports: [
        ShareModule,
        PublicComponentModule
    ],
    declarations: [
        EmailMainComponent
    ]
})
export class EmailModule{}
