import { LoginActionTypes, LoginActionUnion } from './login.action';

/**
 * action定义操作的类型, 定义状态的改变，但是没有指定状态如何具体变化
 * 
 * reducer 定义状态的转换
 * 1. 定义状态的接口类型
 * 2. 处理初始状态
 * reducer函数的职责是以不可变的方式处理状态转换
 * 
 * selectors选择器用来获取存储状态切片的纯函数
 */

export interface LoginState{
    status: string
}

export const initLoginState: LoginState = {
    status: 'login'
}

export function loginStateReducer(state = initLoginState, action: LoginActionUnion): LoginState {
    switch(action.type) {
        case LoginActionTypes.LOGIN: 
            return {
                ...state,
                status: 'login'
            };
        case LoginActionTypes.REGISTER: 
            return {
                ...state,
                status: 'register'
            };
    }
}
