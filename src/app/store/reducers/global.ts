import * as _global from './../actions/global';
import { RightDrawerTypeEnum } from 'src/app/config/app.enum';

export interface State {
    devicePixelRatio: number;
    rightDrawerType: RightDrawerTypeEnum;
    data: any;
}

const initState: State = {
    devicePixelRatio: window.devicePixelRatio,
    rightDrawerType: RightDrawerTypeEnum.NONE,
    data: {}
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
                rightDrawerType: action.payload.type,
                data: action.payload.data
            }
        case _global.ActionTypes.CLOSE_RIGHT_DRAWER: 
            return {
                ...state,
                rightDrawerType: RightDrawerTypeEnum.NONE,
                data: {}
            }
        default: return state;
    }
    // return initState;
}

export const getDevicePixelRatio = (state: State, props?) => state.devicePixelRatio;
export const getRightDrawerType = (state: State, props?) => state.rightDrawerType;
export const getRightDrawerData = (state: State, props?) => state.data;