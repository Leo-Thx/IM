import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/Auth.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    constructor( private authSvc: AuthService ) {

    }
    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        const authToken = this.authSvc.getAuthorizationToken();

        const authReq = request.clone({
            // headers: request.headers.set('Authorization', authToken)
            setHeaders: {
                Authorization: authToken
            },
            // setParams: {}
        });

        return next.handle(authReq);
    }
}
