import * as chat from '../actions/chat';

export interface State {
    // init: boolean,
    chatId: number;
}

const initState: State = {
    // init: true,
    chatId: -1
} as State;


export function reducer( state: State = initState, action: chat.Actions): State {
    switch( action.type ) {
        case chat.ActionTypes.TO_INIT:
            return {
                ...state,
                chatId: -1
            };
        case chat.ActionTypes.TO_CHAT:
            return {
                ...state,
                chatId: action.payload.chatId
            };
        default:
            return state;
    }
}

// export const getInitStatus = (state: State, props?): boolean => state.init;
export const getChatId = (state: State, props?) => state.chatId;
