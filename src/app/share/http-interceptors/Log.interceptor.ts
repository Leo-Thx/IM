import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpLogService } from '../service/HttpLog.service';
import { tap, finalize } from 'rxjs/operators';

@Injectable()
export class LogHttpInterceptor implements HttpInterceptor {

    constructor( private httpLogSvc: HttpLogService ) {}

    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        const started = Date.now();
        let ok: string = '';

        return next.handle( request ).pipe(
            tap( 
                event => event instanceof HttpResponse ? 'succeed': '', // HttpResonse本事就是事件
                error => ok = 'faild'
            ),
            finalize(()=>{
                const elapsed = Date.now() - started;
                const msg = `${request.url} - ${request.method} - ${ok} - ${elapsed}`;
                this.httpLogSvc.add( msg );
            })
        )
    }
    
}
