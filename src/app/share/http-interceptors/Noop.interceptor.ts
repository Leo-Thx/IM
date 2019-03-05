import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class NoopHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // 最后一个处理器: httpClient后端处理器 backendHandler
        // 如果不调用next.handle 则需要自己构造Observable进行返回操作
        req = req.clone({   // 修改请求头
            url: ''
        });

        // 修改请求体
        const newbody = { ...req.body, name: '' };
        req = req.clone({
            body: newbody   // undefined会保持原样，null这是直接清空
        });

        return next.handle(req);
    }
}
