import { defineType } from './utils';
import { Action } from '@ngrx/store';

export const ActionTypes = {
    GET_ALL_MOVIE: defineType('get_all_movie'),
    LOAD_MOVIE_SUCCESS: defineType('load_movie_success')
};

export class getAllAction implements Action {
    readonly type = ActionTypes.GET_ALL_MOVIE;
    constructor(public payload?){}
}

export class loadSuccessAction implements Action {
    readonly type = ActionTypes.LOAD_MOVIE_SUCCESS;
    constructor(public payload = []){}
}

export type Actions = getAllAction | loadSuccessAction;