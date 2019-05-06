import * as chat from '../actions/chat';

export interface State {
    // init: boolean,
    chatTo: Object;
}

const initState: State = {
    // init: true,
    chatTo: {},
} as State;


export function reducer( state: State = initState, action: chat.Actions): State {
    switch( action.type ) {
        case chat.ActionTypes.TO_INIT:
            return {
                ...state,
                chatTo: {}
            };
        case chat.ActionTypes.TO_CHAT:
            return {
                ...state,
                chatTo: action.payload.chatTo
            };
        default:
            return state;
    }
}

// export const getInitStatus = (state: State, props?): boolean => state.init;
export const getChatTo = (state: State, props?) => state.chatTo;
