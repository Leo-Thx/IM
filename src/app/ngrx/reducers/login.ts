import * as login from './../actions/login';
import { createSelector } from '@ngrx/store';

export interface State {
    status: string
}

const initState : State = {
    status: 'login'
};

/**
 * 
 * @param state 
 * @param action 
 */
export function reducer(state = initState, action: login.Actions): State {
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

export const getStatus = (state: State, props: Object):string => state.status;

// export const getOtherSelector = createSelector(getOther, getStatus, (other:string, status:string)=>{
//     return {
//         slOther: other + ' : sel',
//         status: other + ' : ' + status
//     }
// });