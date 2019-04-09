import { Action } from '@ngrx/store';

export const ActionTyps = {
    TO_LOGIN: '[Login] To Login',
    TO_REGISTER : '[Login] To Reigster'
};

export class ToLoginAction implements Action {
    readonly type = ActionTyps.TO_LOGIN;
    constructor (public payload = {}){}
}

export class ToRegisterAction implements Action {
    readonly type = ActionTyps.TO_REGISTER;
    constructor (public payload = {}){}
}

export type Actions = ToLoginAction | ToRegisterAction;