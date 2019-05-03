import { defineType } from './utils';
import { Action } from '@ngrx/store';
import { RightDrawerTypeEnum } from 'src/app/config/app.enum';


export const ActionTypes = {
    // 网页缩放
    DEVICE_PIXEL_RATIO: defineType('devicePixelRatio'),
    // 展示右侧抽屉信息
    SHOW_RIGHT_DRAWER: defineType('show_right_drawer')
};

// 网页缩放
export class DevicePixelRatioAction implements Action {
    readonly type = ActionTypes.DEVICE_PIXEL_RATIO;
    constructor (public payload?) {}
}

export class ShowRightDrawerAction implements Action {
    readonly type = ActionTypes.SHOW_RIGHT_DRAWER;
    constructor(public payload: {type: RightDrawerTypeEnum}) {}
}

export type Actions = DevicePixelRatioAction | ShowRightDrawerAction;