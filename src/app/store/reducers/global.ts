import * as _global from './../actions/global';

export interface State {
    devicePixelRatio: number
}

const initState: State = {
    devicePixelRatio: window.devicePixelRatio
}

export function reducer(state: State = initState, action: _global.Actions): State {
    switch( action.type ){
        case _global.ActionTypes.DEVICE_PIXEL_RATIO:
            return {
                ...state, 
                devicePixelRatio: window.devicePixelRatio
            };
        default: return state;
    }
    // return initState;
}

export const getDevicePixelRatio = (state: State, props?) => state.devicePixelRatio;