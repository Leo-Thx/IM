import { InjectionToken } from '@angular/core';
import { NgElectron, IPC_EventType } from '../../config/config';

/**
 * 全局服务提供
 */
export const NgElInjectionToken:InjectionToken<NgElectron> = new InjectionToken('Angular_Electron');
export const IPCEventInjectionToken: InjectionToken<IPC_EventType> = new InjectionToken('Ipc_Event');
