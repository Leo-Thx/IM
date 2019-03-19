import { Component } from "@angular/core";
import { LoginService } from './login.service';

import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.scss'
    ]
})
export class LoginComponent {
    title = 'loginComponent';
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
      ]);
    
      matcher = new MyErrorStateMatcher();
      
    constructor(private loginSvc: LoginService) {
        console.log(loginSvc);
    }
    onClick(event: MouseEvent){
        console.info(event);
    }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }
