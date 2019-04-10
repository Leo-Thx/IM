import { Action } from '@ngrx/store';
import { defineType } from './utils';

export const ActionTyps = {
    TO_LOGIN: defineType('[LoginComponent] To Login'),
    TO_REGISTER : defineType('[LoginComponent] To Reigster')
};

export class ToLoginAction implements Action {
    readonly type = ActionTyps.TO_LOGIN;
    constructor (public payload?){}
}

export class ToRegisterAction implements Action {
    readonly type = ActionTyps.TO_REGISTER;
    constructor (public payload?){}
}

export type Actions = ToLoginAction | ToRegisterAction;