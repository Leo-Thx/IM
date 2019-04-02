import { NgModule } from "@angular/core";
import { ShareModule } from 'src/app/share/share.module';
import { PublicComponentModule } from '../public/public.module';
import { ScheduleMainComponent } from './schedule-main/schedule-main.component';

@NgModule({
    imports: [
        ShareModule,
        PublicComponentModule
    ],
    declarations: [
        ScheduleMainComponent
    ]
})
export class ScheduleModule{}
