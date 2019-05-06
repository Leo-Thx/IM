import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver } from "@angular/core";
import { Observable, Subscription } from 'rxjs';
import { RightDrawerTypeEnum } from 'src/app/config/app.enum';
import { Store } from '@ngrx/store';

import * as fromRoot from 'src/app/store/reducers';
import * as globalAction from 'src/app/store/actions/global';

import { MatDrawer } from '@angular/material';
import { SingleRightDrawerComponent } from '../chat/widget/info/SingleRightDrawer.component';
import { GroupRightDrawerComponnet } from '../chat/widget/info/GroupRightDrawer.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy{
    public rightDrawer$: Observable<any>;
    public rightDrawerSubscription: Subscription;
    public rightDrawerType: RightDrawerTypeEnum = RightDrawerTypeEnum.NONE;
    public rightDrawerData: any;

    @ViewChild('container', {read: ViewContainerRef}) rightViewRef: ViewContainerRef;
    @ViewChild('rightDrawer', {read: MatDrawer}) rightDrawerRef: MatDrawer;
    public rightDrawerClosedStart: Subscription;

    constructor(
        public store: Store<fromRoot.State>,
        public componentFactoryResolver: ComponentFactoryResolver){}

    ngOnInit() {
        this.rightDrawer$ = this.store.select(fromRoot.getRightDrawer);
        this.rightDrawerSubscription = this.rightDrawer$.subscribe(v=>{
            // console.info('rightDrawer:', v);
            this.rightDrawerType = v.type;
            this.rightDrawerData = v.data;
            this.renderRightDrawer();
        });

        // 右侧关闭
        this.rightDrawerClosedStart = this.rightDrawerRef.closedStart.subscribe(()=>{
            this.store.dispatch(new globalAction.CloseRightDrawerAction());
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
        // 多人聊天信息 
        else if( this.rightDrawerType === RightDrawerTypeEnum.GROUP_INFO) {
            let comFactory = this.componentFactoryResolver.resolveComponentFactory(GroupRightDrawerComponnet);
            this.rightViewRef.createComponent(comFactory);
            this.rightDrawerRef.open();
        }
    }

    ngOnDestroy() {
        this.rightDrawerSubscription.unsubscribe();
        this.rightDrawerClosedStart.unsubscribe();
    }
}
