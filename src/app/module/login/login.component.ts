import { Component, AfterViewInit, OnInit, OnChanges, DoCheck } from "@angular/core";
import { LoginService } from './login.service';

import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormArray, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { state, style, trigger, transition, animate, keyframes, stagger, query } from '@angular/animations';
import { Router } from '@angular/router';
import { IpcService } from 'src/app/share/ipc/Ipc.service';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as login from 'src/app/ngrx/actions/login';
import * as fromRoot from 'src/app/ngrx/reducers';

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
                opacity: 0,
                // left: '60%'
            })),
            state('register', style({
                zIndex: 2,
                opacity: 1,
                // left: 0
            })),
            transition("login=>register", [
                animate('.5s ease-in-out'),
                // query('.content', [
                //     style({opacity: 0}),
                //     stagger(0, [
                //         animate('0.5s ease-in-out', style({
                //             opacity: 1
                //         })),
                //     ])
                // ]),
            ]),
            transition("register=>login", [
                animate('.5s ease-in-out'),
            ])
        ]),
        // trigger('registerCardToRegister', [
        //     state('login', style({
        //         opacity: 0
        //     })),
        //     state('register', style({
        //         opacity: 1
        //     })),
        //     transition("login=>register", [
        //         animate('2s ease-in-out'),
        //     ]),
        // ])
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
        private store: Store<fromRoot.State> ) {
            
        this.user = {};
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

