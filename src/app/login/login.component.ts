import { Component, AfterViewInit, OnInit, OnChanges, DoCheck } from "@angular/core";
import { LoginService } from './login.service';

import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormArray, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { IpcService } from '../share/ipc/Ipc.service';

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
    ]
})
export class LoginComponent implements AfterViewInit, OnInit, OnChanges, DoCheck{
    title = 'loginComponent';
    user: Object;

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

