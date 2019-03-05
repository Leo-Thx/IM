import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/Auth.service';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    constructor( private authSvc: AuthService ) {}

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

/**
 * XSRF 伪站攻击
 * 对应拦截器会从cookie读取 名为: XSRF-TOKEN的令牌, 并设置到请求头: X-XSRF-TOKEN 中
 * 默认情况下，拦截器会在所有的修改型请求中（比如 POST 等）把这个 cookie 发送给使用相对 URL 的请求。
 * 但不会在 GET/HEAD 请求中发送，也不会发送给使用绝对 URL 的请求。 服务器生成对应的即可
 */
