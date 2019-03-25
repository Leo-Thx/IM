import { Component, AfterViewInit, OnInit, OnChanges, DoCheck } from "@angular/core";
import { LoginService } from './login.service';

import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormArray, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { IpcService } from '../share/ipc/Ipc.service';
import { state, style, trigger, transition, animate, keyframes } from '@angular/animations';

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
        trigger('openClose', [
            // state函数来定义不同的状态，供每次转场结束时调用
            // style定义一组与指定的状态名相关的样式。注意，样式的属性必须是小驼峰 格式的
            // 转场[标志状态在一定时间内发生]与时序
            state('open', style({
                backgroundColor: 'yellow',
            })),
            state('closed', style({
                backgroundColor: 'red'
            })),
            transition('open => closed', [
                animate('2s ease-out', keyframes([
                    style({ backgroundColor: 'blue' }),
                    style({ backgroundColor: 'green' }),
                    style({ backgroundColor: 'purple' })
                ]))
            ]),
            transition('closed => open', [
                animate('0.5s')
            ])
        ]),
        trigger('flyInOut', [
            state('in', style({
                transform: 'translateX(0)'
            })),
            transition('* => void', [
                style({
                    transform: 'translateX(-100%)'
                }),
                animate('.5s')
            ]),
            transition('void => *', [
                style({
                    transform: 'translateX(100%)'
                }),
                animate('1s')
            ])
        ]),
        trigger('myInsertRemoveTrigger', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('5s', style({ opacity: 1 })),
            ]),
            transition(':leave', [
                animate('5s', style({ opacity: 0 }))
            ])
        ]),
    ]
})
export class LoginComponent implements AfterViewInit, OnInit, OnChanges, DoCheck{
    title = 'loginComponent';
    user: Object;
    isOpen = true;

    // 单个表单控件实例
    accountCtrl = new FormControl('71661048@qq.com');
    // 表单组
    groupCtrl = new FormGroup({     // 处理表单组
        firstName: new FormControl('firstname', Validators.required),
        lastName: new FormControl('lastname')
    });
    groupObject: FormGroup;

    // 管理任意数量的匿名控件
    aliases: FormArray;

    matcher = new MyErrorStateMatcher();

    constructor(private loginSvc: LoginService, private fb: FormBuilder, ipcSvc: IpcService) {
        console.log(loginSvc, ipcSvc);
        
        this.user = {};
        this.useFormBuilder();
    }

    onAnimationEvent (event) {
        // console.info(event);
    }

    useFormBuilder() {
        this.groupObject = this.fb.group({
            firstName: ['init', Validators.required],
            lastName: [''],

            aliases: this.fb.array([
                this.fb.control('')
            ])
        }, {
            validators: []
        });

        this.aliases = <FormArray>this.groupObject.get('aliases');
        this.aliases.push(this.fb.control(''));
    }

    onClick(event: MouseEvent){
        console.info(event);
        this.isOpen = !this.isOpen;
    }
    
    ngAfterViewInit() {
        // this.accountCtrl.setValue('ceshi');
    }
    ngOnInit() {
        // setTimeout(()=>{
        //     this.demo.setValue('ceshi');
        // }, 1000);
    }
    ngOnChanges(){
        
    }
    ngDoCheck(){

    }
}

