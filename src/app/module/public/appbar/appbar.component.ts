import { Component, OnInit } from "@angular/core";
import { IpcService } from 'src/app/share/ipc/Ipc.service';
import { Observable, Subject, from } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { Store, select } from '@ngrx/store';

import * as fromRoot from 'src/app/ngrx/reducers';

// 因为之前我们设置标题栏样式-webkit-app-region: drag，这里按钮必须设置样式-webkit-app-region: no-drag，不然按钮将无法选中或点击

@Component({
    selector: 'app-topbar',
    templateUrl: './appbar.component.html',
    styleUrls: [
        './appbar.component.scss'
    ]
})
export class AppTopBarComponent implements OnInit{
    public currentTime: Date;
    private timeSubject: Subject<Date> = new Subject();
    private timer: NodeJS.Timer;
    public currentClasses = {
        login: false,
        register: false
    };

    // 用于切换文字颜色, 主要是注册右边为白色
    public loginState$: Observable<string>;

    constructor(
            public ipcSvc: IpcService, public router: Router,
            private store: Store<fromRoot.State>) {
                
        this.timeSubject.subscribe((arg)=>{
            this.currentTime = arg;
        });
        this.timer = setInterval(()=>this.timeSubject.next(new Date), 1000);

        this.router.events.subscribe((event)=>{
            if( event instanceof NavigationEnd ){
                this.currentClasses.login = false;
                if( event.urlAfterRedirects === '/login' ) {
                    this.currentClasses.login = true;
                }
            }
       });
    }

    ngOnInit(){
        this.loginState$ = this.store.select(fromRoot.getLoginState, { multiply: 2 });
        this.loginState$.subscribe(status=>{
            this.currentClasses.register = status === 'register';
        });
    }

    minimizable(){}
    
    maximizable(){}

    // 关闭窗口
    closeWindow(){
        this.ipcSvc.exitApp();
    }
}
