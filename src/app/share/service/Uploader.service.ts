import { Injectable } from "@angular/core";
import { HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { NetworkService } from '../network/network.service';
import { map, tap, last, catchError } from 'rxjs/operators';

@Injectable()
export class HttpUploaderService {
    constructor( private networkSvc: NetworkService ) {}
    upload() {
        let file = {name:'', size: 1};
        const request = new HttpRequest('POST', '', file, {
            reportProgress: true        // 上报进度
        });

        return this.networkSvc.httpClient.request(request).pipe(
            map( event => this.getEventMessage(event, file) ),
            tap( message => this.showEventMessage( message ) ),
            last(),
            catchError(this.networkSvc.handleError)
        );
    }

    getEventMessage(event: HttpEvent<any>, file: any) {
        switch( event.type ) {
            case HttpEventType.Sent: return `开始上传 ${file.name} - ${file.size}`;
            case HttpEventType.UploadProgress: 
                const percentDone = Math.round( event.loaded / event.total ) ;
                return `${file.name} 已经上传 ${percentDone}`;
            case HttpEventType.Response: 
                return `${file.name} 上传完成`;

            // 已经接收到返回码
            case HttpEventType.ResponseHeader:
            // 下载进度
            case HttpEventType.DownloadProgress:
            // 拦截器派发的自定义事件
            case HttpEventType.User:
            default:
                return ``;
        }
    }

    showEventMessage( message ) {}
}
