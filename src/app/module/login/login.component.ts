import { Component, AfterViewInit, OnInit, OnChanges, DoCheck } from "@angular/core";
import { LoginService } from './login.service';

import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormArray, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { state, style, trigger, transition, animate, keyframes, stagger, query } from '@angular/animations';
import { Router } from '@angular/router';
import { IpcService } from 'src/app/share/ipc/Ipc.service';
import { MatSnackBar, MatIconRegistry } from '@angular/material';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as login from 'src/app/store/actions/login';
import * as fromRoot from 'src/app/store/reducers';
import { DomSanitizer } from '@angular/platform-browser';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.scss'
    ],
    animations: [
        // 切换到注册 zIndex:0->2   opacity:0->1
        // 背景切换-移动+里层透明度变化
        // boxShadow: '0px 0px 30px 10px #e0e0e0',
        trigger('toRegister', [
            state('login', style({
                zIndex: 0,
                opacity: 0
            })),
            state('register', style({
                zIndex: 2,
                opacity: 1
            })),
            transition("login<=>register", [
                animate('.1s')
            ])
        ])
    ]
})
export class LoginComponent {
    user: Object;

    // 单个表单控件实例
    public accountFc = new FormControl('71661048@qq.com');
    public isLoginState = true;

    constructor(
        private loginSvc: LoginService, 
        private fb: FormBuilder, 
        public ipcSvc: IpcService, 
        public router: Router,
        public snackBar: MatSnackBar,
        private store: Store<fromRoot.State>, 
        iconRegistry: MatIconRegistry, sanitizer: DomSanitizer ) {
            this.user = {};
            // iconRegistry.addSvgIcon('icon-logo', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/login/icon-logo.svg'));
            // iconRegistry.addSvgIcon('pic-banner', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/login/pic-banner.svg'));
    }

    changeToReigster(){
        this.isLoginState = false;
        this.store.dispatch(new login.ToRegisterAction);
    }
    changeToLogin(){
        this.isLoginState = true;
        this.store.dispatch(new login.ToLoginAction);
    }

    goLogin(event: MouseEvent){
        this.snackBar.open('登录成功', undefined, {
            duration: 1000
        });

        // 经过ipc到后台登录 进行socket连接
        this.router.navigateByUrl('main');

        // Notification.requestPermission(function(status) {    // mac下有效
        //     console.info(status);
        //     if (status === "granted") {
        //         var m = new Notification('收到信息', {
        //             body: '这里是通知内容！你想看什么客官？',　　//消息体内容
        //         });
        //         m.onclick = function (e) {//点击当前消息提示框后，跳转到当前页面
        //             console.info(e);
        //         }
        //     } else{
        //         alert('当前浏览器不支持弹出消息')
        //     }
        // });
    }
}

