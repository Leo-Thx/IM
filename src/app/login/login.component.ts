import { Component } from "@angular/core";
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.scss'
    ]
})
export class LoginComponent {
    title = 'loginComponent';
    constructor(private loginSvc: LoginService) {
        console.log(loginSvc);
    }
    onClick(event: MouseEvent){
        console.info(event);
    }
}
