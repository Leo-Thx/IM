import { defineType } from './utils';
import { Action } from '@ngrx/store';


export const ActionTypes = {
    DEVICE_PIXEL_RATIO: defineType('devicePixelRatio')
};

// 网页缩放
export class DevicePixelRatioAction implements Action {
    readonly type = ActionTypes.DEVICE_PIXEL_RATIO;
    constructor (public payload?) {}
}

export type Actions = DevicePixelRatioAction;