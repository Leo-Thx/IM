import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { NetworkService } from 'src/app/share/network/network.service';

import * as moveAction from '../store/actions/movie';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class MovieEffects {
    constructor( private actions$: Actions, private netSvc: NetworkService) {}

    // 不进行后续的动作分配
    // @Effect({dispatch: false})
    @Effect()
    loadMovie$ = this.actions$.pipe(
        ofType(moveAction.ActionTypes.GET_ALL_MOVIE),
        mergeMap(()=>this.netSvc.getMovies()
            .pipe(
                // 难道map中要返回一个action才会进行动作分配？
                map(movies=>new moveAction.loadSuccessAction(movies as [])),
                catchError(()=>EMPTY)
            )
        )
    );
}
