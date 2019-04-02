import { NgModule } from "@angular/core";
import { ShareModule } from 'src/app/share/share.module';
import { PublicComponentModule } from '../public/public.module';
import { MusicMainComponent } from './music-main/music-main.component';

@NgModule({
    imports: [
        ShareModule,
        PublicComponentModule
    ],
    declarations: [
        MusicMainComponent
    ]
})
export class MusicModule{}

