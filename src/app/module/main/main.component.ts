import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver } from "@angular/core";
import { Observable, Subscription } from 'rxjs';
import { RightDrawerTypeEnum } from 'src/app/config/app.enum';
import { Store } from '@ngrx/store';

import * as fromRoot from 'src/app/store/reducers';
import * as globalAction from 'src/app/store/actions/global';

import { MatDrawer } from '@angular/material';
import { SingleRightDrawerComponent } from '../chat/widget/info/SingleRightDrawer.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy{
    public rightDrawerType$: Observable<RightDrawerTypeEnum>;
    public rightDrawerSubscription: Subscription;
    public rightDrawerType: RightDrawerTypeEnum = RightDrawerTypeEnum.NONE;

    @ViewChild('container', {read: ViewContainerRef}) rightViewRef: ViewContainerRef;
    @ViewChild('rightDrawer', {read: MatDrawer}) rightDrawerRef: MatDrawer;
    public rightDrawerClosedStart: Subscription;

    constructor(
        public store: Store<fromRoot.State>,
        public componentFactoryResolver: ComponentFactoryResolver){}

    ngOnInit() {
        this.rightDrawerType$ = this.store.select(fromRoot.getRightDrawerType);
        this.rightDrawerSubscription = this.rightDrawerType$.subscribe(v=>{
            // console.info('打开右侧抽屉类型：', v);
            this.rightDrawerType = v;
            this.renderRightDrawer();
        });

        // 右侧关闭
        this.rightDrawerClosedStart = this.rightDrawerRef.closedStart.subscribe(()=>{
            this.store.dispatch(new globalAction.ShowRightDrawerAction({
                type: RightDrawerTypeEnum.NONE
            }));
        });
    }

    renderRightDrawer(){
        this.rightViewRef.clear();
        // 直接关闭[注意里层组件生命周期函数调用]
        if( this.rightDrawerType === RightDrawerTypeEnum.NONE ) {
            if( this.rightDrawerRef.opened ) this.rightDrawerRef.close();
        }
        // 单个信息
        else if(this.rightDrawerType === RightDrawerTypeEnum.SINGLE_INFO) {
            let comFactory = this.componentFactoryResolver.resolveComponentFactory(SingleRightDrawerComponent);
            this.rightViewRef.createComponent(comFactory);
            this.rightDrawerRef.open();
        }
    }

    ngOnDestroy() {
        this.rightDrawerSubscription.unsubscribe();
        this.rightDrawerClosedStart.unsubscribe();
    }
}
