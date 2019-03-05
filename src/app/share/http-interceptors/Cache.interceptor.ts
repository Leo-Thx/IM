import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpCacheService } from '../service/HttpCache.service';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheHttpInterceptor implements HttpInterceptor {
    
    constructor( private cacheSvc: HttpCacheService ){}

    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        // 判断是否需要缓存
        const cacheValue = this.cacheSvc.getCache( request.url+"#"+request.method );
        if( cacheValue ) return of( cacheValue );
        
        return this.sendRequest( request, next );
    }

    sendRequest( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        return next.handle( request ).pipe(
            tap(event => {
                if( event instanceof HttpResponse ) 
                    this.cacheSvc.setCache(request.url+"#"+request.method, event.body);
            })
        );
    }
}
