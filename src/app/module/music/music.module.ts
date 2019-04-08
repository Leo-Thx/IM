import { NgModule } from "@angular/core";
import { ShareModule } from 'src/app/share/share.module';
import { PublicComponentModule } from '../public/public.module';
import { MusicMainComponent } from './music-main/music-main.component';

// 主界面
// 主界面底部播放条
// 播放列表显示
// 顶部状态栏播放条

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

