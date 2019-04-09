import { Component } from "@angular/core";
import { IpcService } from 'src/app/share/ipc/Ipc.service';
import { Observable, Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { LoginState } from 'src/app/ngstore/login/login.reducer';

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
    public currentClasses = {
        login: false,
        register: false
    };

    // 用于切换文字颜色, 主要是注册右边为白色
    public loginState$: Observable<LoginState>;

    constructor(
            public ipcSvc: IpcService, public router: Router,
            private store: Store<LoginState>) {
                
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

       this.loginState$ = store.select('loginState');
       this.loginState$.subscribe(state=>{
           if(state) this.currentClasses.register = state.status === 'register';
       });
    }

    minimizable(){}
    
    maximizable(){}

    // 关闭窗口
    closeWindow(){
        this.ipcSvc.exitApp();
    }
}
