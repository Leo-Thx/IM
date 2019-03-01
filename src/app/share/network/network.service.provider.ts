import { INetworkConfig } from 'src/app/config/network.config';
import { NetworkService } from './network.service';


export function networkFactory(nwConfig: INetworkConfig): NetworkService {
    return new NetworkService(nwConfig);
}
