import { NgModule } from "@angular/core";
import { LayoutComponent } from './layout.component';
import { ShareModule } from 'src/app/share/share.module';
import { ChatModule } from '../chat/chat.module';
import { PublicComponentModule } from '../public/public.module';
import { LoginModule } from '../login/login.module';
import { MainMoule } from '../main/main.module';

@NgModule({
    imports: [ 
        // RouterModule.forChild(layoutRoutes), 
        ShareModule,

        PublicComponentModule,
        
        LoginModule,
        MainMoule,
        ChatModule
    ],
    declarations: [
        LayoutComponent
    ],
    exports: [ LayoutComponent ]
})
export class LayoutModule {}
