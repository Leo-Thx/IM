import * as _global from './../actions/global';
import { RightDrawerTypeEnum } from 'src/app/config/app.enum';

export interface State {
    devicePixelRatio: number;
    rightDrawerType: RightDrawerTypeEnum;
}

const initState: State = {
    devicePixelRatio: window.devicePixelRatio,
    rightDrawerType: RightDrawerTypeEnum.NONE
}

export function reducer(state: State = initState, action: _global.Actions): State {
    switch( action.type ){
        case _global.ActionTypes.DEVICE_PIXEL_RATIO:
            return {
                ...state, 
                devicePixelRatio: window.devicePixelRatio
            };
        case _global.ActionTypes.SHOW_RIGHT_DRAWER:
            return {
                ...state,
                rightDrawerType: action.payload.type
            }
        default: return state;
    }
    // return initState;
}

export const getDevicePixelRatio = (state: State, props?) => state.devicePixelRatio;
export const getRightDrawerType = (state: State, props?) => state.rightDrawerType;