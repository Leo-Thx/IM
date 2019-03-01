import { Injectable } from '@angular/core';
import { INetworkConfig } from 'src/app/config/network.config';

// @Injectable({
//     providedIn: 'root'
// })
export class NetworkService {
    private config: INetworkConfig = {} as INetworkConfig;
    // constructor() {}
    constructor(config?: INetworkConfig) {
        this.config = config;
    }
}
