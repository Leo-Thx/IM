import { Action } from '@ngrx/store';
import { defineType } from './utils';

export const ActionTypes = {
    // 初始化界面 不含主界面和输入框
    TO_INIT: defineType('[ChatComponent] To Init'),
    TO_CHAT: defineType('[ChatComponent] To Chat')
};

export class ToInitAction implements Action {
    readonly type = ActionTypes.TO_INIT;
    constructor(public payload?){}
}

export class ToChatAction implements Action {
    readonly type = ActionTypes.TO_CHAT;
    constructor(public payload?){}
}

export type Actions = ToInitAction | ToChatAction;