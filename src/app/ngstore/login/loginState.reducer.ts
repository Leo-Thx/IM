import { Action } from '@ngrx/store';
import { loginActionTypes } from './loginState.action';

export function loginStateReducer(state = 'login', action: Action) {
    switch(action.type) {
        case loginActionTypes.LOGIN: return 'login';
        case loginActionTypes.REGISTER: return 'register'
    }
}
