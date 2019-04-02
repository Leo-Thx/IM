import { NgModule } from "@angular/core";
import { LayoutComponent } from './layout.component';
import { ShareModule } from 'src/app/share/share.module';
import { ChatModule } from '../chat/chat.module';
import { PublicComponentModule } from '../public/public.module';
import { LoginModule } from '../login/login.module';
import { MainMoule } from '../main/main.module';
import { ConcatsModule } from '../concats/concats.module';
import { ScheduleModule } from '../schedule/schedule.module';
import { EmailModule } from '../email/email.module';
import { MusicModule } from '../music/music.module';

@NgModule({
    imports: [ 
        // RouterModule.forChild(layoutRoutes), 
        ShareModule,

        PublicComponentModule,
        
        LoginModule,
        MainMoule,

        ChatModule,
        ConcatsModule,
        ScheduleModule,
        EmailModule,
        MusicModule
    ],
    declarations: [
        LayoutComponent
    ],
    exports: [ LayoutComponent ]
})
export class LayoutModule {}
