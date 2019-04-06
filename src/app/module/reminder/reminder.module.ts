import { NgModule } from "@angular/core";
import { ShareModule } from 'src/app/share/share.module';
import { PublicComponentModule } from '../public/public.module';
import { ReminderMainComponent } from './reminder-main/reminder-main.component';

@NgModule({
    imports: [
        ShareModule,
        PublicComponentModule
    ],
    declarations: [
        ReminderMainComponent
    ]
})
export class ReminderModule{}
