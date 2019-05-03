import { Injectable } from '@angular/core';
import { Subject, PartialObserver, Subscription } from 'rxjs';

@Injectable()
export class GlobalService {
    private bodyClick: Subject<MouseEvent> = new Subject;
    constructor() {}

    // 考虑到只是事件的发生，不需要耦合应用状态
    dispatchBodyClick(event){
        this.bodyClick.next(event);
    }

    subscribeBodyClick(observer: PartialObserver<MouseEvent>): Subscription;
    subscribeBodyClick(next?: (value: MouseEvent) => void, error?: (error: any) => void, complete?: () => void): Subscription;
    subscribeBodyClick(observer, error?, complete?): Subscription {
        if( typeof observer === 'function' ) {
            return this.bodyClick.subscribe(observer, error, complete);
        } else {
            return this.bodyClick.subscribe(observer);
        }
    }
}