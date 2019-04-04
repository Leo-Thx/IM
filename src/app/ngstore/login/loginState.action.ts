import { Action } from '@ngrx/store';

export enum loginActionTypes {
    LOGIN = '[Login Component] Login',
    REGISTER = '[Login Component] Register'
}

export class LoginAction implements Action {
    readonly type = loginActionTypes.LOGIN;
}

export class ReigsterAction implements Action {
    readonly type = loginActionTypes.REGISTER
}
