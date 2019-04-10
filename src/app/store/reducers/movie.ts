import * as move from '../actions/movie';

export interface Movie {
    name: number,
    id: number
}
export interface State {
    movies: Movie[]
}

const initState : State = {
    movies: []
}

export function reducer(state: State = initState, action: move.Actions): State{
    // console.info(state, action)
    switch(action.type){
        case move.ActionTypes.GET_ALL_MOVIE:
            console.info(state, action)
            return state;
        case move.ActionTypes.LOAD_MOVIE_SUCCESS:
            state.movies = action.payload;
            console.info(state, action)
            return state;
        default: 
            return state;
    }
}
