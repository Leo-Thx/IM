import { Action } from '@ngrx/store';

export enum LoginActionTypes {
    LOGIN = '[Login Component] Login',
    REGISTER = '[Login Component] Register'
}

export class LoginAction implements Action {
    readonly type = LoginActionTypes.LOGIN;
    constructor(public payload = {}){

    }
}

export class ReigsterAction implements Action {
    readonly type = LoginActionTypes.REGISTER
    constructor( public payload = {} ){

    }
}

export type LoginActionUnion = LoginAction | ReigsterAction;
