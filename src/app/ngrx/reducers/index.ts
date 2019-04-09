/** 
 * @ngrx/router-store
 * @ngrx/effects
 * @ngrx/core
*/

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

import * as fromLogin from './login';
import { ActionReducer, compose, combineReducers, createSelector, Action } from '@ngrx/store';

// 应用状态
export interface State {
    login: fromLogin.State
}

// 转换器
export const reducers = {
    login: fromLogin.reducer
};

// const prodReducer: ActionReducer<State> = combineReducers(reducers);

// export function reducer (state: State, action: Action) {
//     console.info('reducer', state);
//     return prodReducer(state, action);
// }

const getlogin = (state: State)=>state.login;
export const getLoginState = createSelector(getlogin, fromLogin.getStatus)

