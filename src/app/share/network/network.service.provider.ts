import { INetworkConfig } from 'src/app/config/network.config';
import { NetworkService } from './network.service';
import { HttpClient } from '@angular/common/http';


export function networkFactory(
        nwConfig: INetworkConfig,
        httpClient: HttpClient
    ): NetworkService {

    return new NetworkService(httpClient, nwConfig);
}
