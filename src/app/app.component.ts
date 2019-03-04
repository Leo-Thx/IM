import { Component, AfterViewInit } from '@angular/core';
import { NetworkService } from './share/network/network.service';

declare global {
    interface Window {
        $AE: any;
    }
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
    title = 'IM';
    constructor(service: NetworkService) {
        console.log(service);
    }
    ngAfterViewInit() {
        // console.log((window as any).$AE);
        console.log( window.$AE );
    }
}
