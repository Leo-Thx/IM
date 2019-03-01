import { Injectable } from '@angular/core';
import { INetworkConfig } from 'src/app/config/network.config';
import { HttpClient } from '@angular/common/http';

type ParamValueType = boolean | string | number | null | undefined | Date | Array<any>;
export interface ParamType {
    [key: string]: ParamValueType;
}

// @Injectable({
//     providedIn: 'root'
// })
export class NetworkService {
    private config: INetworkConfig = {} as INetworkConfig;
    private httpClient: HttpClient;
    // constructor() {}
    constructor(httpClient: HttpClient, config?: INetworkConfig ) {
        this.config = config;
        this.httpClient = httpClient;
    }

    post(url: string, params: ParamType) {}

    delete() {}

    put() {}

    get(url: string, params: ParamType) {
        return this.httpClient.get(url, {
            headers: {}
        });
    }
}
