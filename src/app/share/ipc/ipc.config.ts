import { InjectionToken } from '@angular/core';
import { NgElectron, IPC_EventType } from './ipc';

export const NgElInjectionToken:InjectionToken<NgElectron> = new InjectionToken('Angular_Electron');
export const IPCEventInjectionToken: InjectionToken<IPC_EventType> = new InjectionToken('Ipc_Event');
