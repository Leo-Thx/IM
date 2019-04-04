import { Component } from "@angular/core";
import { IpcService } from 'src/app/share/ipc/Ipc.service';
import { Observable, Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

// 因为之前我们设置标题栏样式-webkit-app-region: drag，这里按钮必须设置样式-webkit-app-region: no-drag，不然按钮将无法选中或点击

@Component({
    selector: 'app-topbar',
    templateUrl: './appbar.component.html',
    styleUrls: [
        './appbar.component.scss'
    ]
})
export class AppTopBarComponent {
    public currentTime: Date;
    private timeSubject: Subject<Date> = new Subject();
    private timer: NodeJS.Timer;
    public currentClasses = {};

    constructor(public ipcSvc: IpcService, public router: Router) {
        this.timeSubject.subscribe((arg)=>{
            this.currentTime = arg;
        });
        this.timer = setInterval(()=>this.timeSubject.next(new Date), 1000);

        this.router.events.subscribe((event)=>{
            if( event instanceof NavigationEnd ){
                this.currentClasses = {};
                if( event.urlAfterRedirects === '/login' ) {
                    this.currentClasses = {
                        login: true
                    }
                }
            }
       });
    }

    minimizable(){

    }
    
    maximizable(){

    }

    // 关闭窗口
    closeWindow(){
        this.ipcSvc.exitApp();
    }
}
