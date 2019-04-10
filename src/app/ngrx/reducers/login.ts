
import * as login from './../actions/login';
import { createSelector } from '@ngrx/store';

export interface State {
    status: string,
    other?: string;
}

export const initState : State = {
    status: 'login',
    other: 'init value'
};

/**
 * 
 * @param state 
 * @param action 
 */
export function reducer(state = initState, action: login.Actions): State {
    // console.info(111111111, state);
    switch(action.type) {
        case login.ActionTyps.TO_LOGIN: 
            return {
                ...state,
                status: 'login'
            };
        case login.ActionTyps.TO_REGISTER: 
            return {
                ...state,
                status: 'register'
            };
        default:
            return state;
    }
}

export const getOther = (state: State):string => state.other;
export const getStatus = (state: State, props: Object):string => {
    // console.info(props);
    return state.status;
};

export const getOtherSelector = createSelector(getOther, getStatus, (other:string, status:string)=>{
    return {
        slOther: other + ' : sel',
        status: other + ' : ' + status
    }
});