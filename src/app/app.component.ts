import { Component, AfterViewInit } from '@angular/core';
import { NetworkService } from './share/network/network.service';


declare global {
    interface Window {
        $NgEl: any;
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
        // console.log((window as any).$NgEl);
        // console.log( window.$NgEl );
    }
}
