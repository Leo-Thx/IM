import { Component } from '@angular/core';
import { NetworkService } from './share/network/network.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'IM';
    constructor(service: NetworkService) {
        console.log(service);
    }
}
