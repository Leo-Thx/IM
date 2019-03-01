export interface INetworkConfig {
    protocol?: string;
    host?: string;
    port?: number;
}

export abstract class INetworkConfig implements INetworkConfig {}

export let networkConfig: INetworkConfig = {
    protocol: 'http://',
    host: '127.0.0.1',
    port: 8080
};
