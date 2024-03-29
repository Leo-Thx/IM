/** 
 * @ngrx/router-store
 * @ngrx/effects
 * @ngrx/core
*/

// Action: Action是状态的改变。它描述了某个事件的发生，但是没有指定应用的状态如何改变。
// ActionReducerMap： ActionReducerMap注册了一系列的reducer，在应用中使用StoreModule对它进行配置。
// ActionReducer: 它被用于创建reducer，例如logger。
// MetaReducer: 在应用中使用StoreModule配置的MetaReducer构成了根的meta-reducer。
// StoreModule: StoreModule是@ngrx/storeAPI中的一个模块，它被用来在应用模块中配置reducer。
// createFeatureSelector: 它为状态（state）创建一个feature selector。
// createSelector: 它创建一个selector用于生成一个指定的状态。
// Store: 它提供了Store.select()和Store.dispatch()来与reducer协同工作。Store.select()用于选择一个selector，Store.dispatch()用于向reducer分发action的类型。

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
import * as fromChat from './chat';
import * as move from './movie';
import * as fromGlobal from './global';

import { ActionReducer, createSelector, Action, createFeatureSelector, MemoizedSelectorWithProps, MemoizedSelector, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment.prod';

// 应用状态
export interface State {
    login: fromLogin.State,
    chat: fromChat.State,
    effect: move.State,
    global: fromGlobal.State
}


// StoreModule.forRoot({
//     ...reducers
// }),
// export const reducers = {
//     login: fromLogin.reducer
// };

// 注册reducer
export const reducers: ActionReducerMap<State> = {
    login: fromLogin.reducer,
    chat: fromChat.reducer,
    effect: move.reducer,
    global: fromGlobal.reducer
};


export function logger(reducer: ActionReducer<State>): ActionReducer<State>{
    return function (state: State, action: Action): State{
        // console.log('state : ', state);
        // console.log('action : ', action);
        return reducer(state, action);
    }
}
export const metaReducers: MetaReducer<State>[] = environment.production ? [] : [logger];


// createFeatureSelector等同于getLogin获取状态
// export const selectLoginFeature: MemoizedSelector<State, fromLogin.State> = createFeatureSelector<State, fromLogin.State>('login');
// const getlogin = (state: State, props):fromLogin.State=>state.login;
const getLogin = createFeatureSelector('login');
const getChat = createFeatureSelector('chat');
const getGlobal = createFeatureSelector('global');
// export { getGlobal };


export const getLoginState: MemoizedSelectorWithProps<State, Object, string> = createSelector(getLogin, fromLogin.getStatus);
// export const getChatState = createSelector(getChat, fromChat.getInitStatus);
export const getChatTo = createSelector(getChat, fromChat.getChatTo);


// 
export const getPixelRatio = createSelector(getGlobal, fromGlobal.getDevicePixelRatio);
export const getRightDrawerType = createSelector(getGlobal, fromGlobal.getRightDrawerType);
export const getRightDrawerData = createSelector(getGlobal, fromGlobal.getRightDrawerData);
export const getRightDrawer = createSelector(getGlobal, (state: fromGlobal.State, props?)=>({
    type: state.rightDrawerType,
    data: state.data
}));


