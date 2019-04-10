import { Injectable } from '@angular/core';
import { INetworkConfig } from 'src/app/share/network/network.config';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

type ParamValueType = boolean | string | number | null | undefined | Date | Array<any>;
export interface ParamType {
    [key: string]: ParamValueType;
}

// @Injectable({
//     providedIn: 'root'
// })
export class NetworkService {
    private config: INetworkConfig = {} as INetworkConfig;
    httpClient: HttpClient;

    // constructor() {}
    constructor(httpClient: HttpClient, config?: INetworkConfig ) {
        this.config = config;
        this.httpClient = httpClient;
        console.log(config);
    }

    post(url: string, params: ParamType) {
        
    }

    urlParams() {
        let headers = new HttpHeaders({ // HttpHeaders不可变
            'Content-Type': 'application/json'
        });
        headers = headers.set('Auth', "always");
        return this.httpClient.get('', {
            headers,
            params: new HttpParams().set('name', '测试')    //HttpParams[url参数] 同上
        });
    }

    delete() {}

    put() {}

    get<T>(url: string, params: ParamType): Observable<T>{
        return this.httpClient.get<T>(url, {
            // responseType: "text",
            headers: {}
        }).pipe(
            retry(2),
            catchError(this.handleError)
        );

        return this.httpClient.post<T>(url, params, {})
            .pipe(
                tap(
                    data => this.log(data), 
                    error => this.handleError(error)
                )
        );
    }

    
    handleError( error: HttpErrorResponse ) {
        if ( error.error instanceof ErrorEvent ) {  // 客户端或网络错误
            console.error("");
        } else {    // 服务端错误
            console.error(error.status);
        }

        // 其他错误
        return throwError('');
    }
    log( data ) {

    }

    getMovies(){
        return new Observable(observer=>{
            console.info('正在模拟加载...');
            setTimeout(()=>{
                console.info('获得数据...');
                observer.next(
                    Array.from({length: 5}).fill('Math.random()').
                        map((name, index)=>({id: index, name}))
                );
            }, 3000);
        });
    }
}
