import { IpcService } from './Ipc.service';
import { NgElectron, IPC_EventType } from './ipc';

export function IpcServiceFactory(
    ngElectron: NgElectron,
    ipcEvent: IPC_EventType
): IpcService {
    return new IpcService(ngElectron, ipcEvent);
}
