import { Component, OnInit, OnDestroy, ElementRef, Injector, ApplicationRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef, EventEmitter, ViewChild } from "@angular/core";
import { Subject } from 'rxjs';
import { DomPortalHost, ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { PORTAL_CHILD_DATA, PortalChildComponent } from './PortalChildComponent';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-portal-com',
    template: `<div class="appPortalComponent" #elRef></div>`
})
export class PortalDomComponent implements OnInit, OnDestroy{
    // export { DomPortalOutlet as DomPortalHost } from './dom-portal-outlet';
    // export { CdkPortalOutlet as PortalHostDirective, CdkPortal as TemplatePortalDirective, } from './portal-directives';
    // export { PortalOutlet as PortalHost, BasePortalOutlet as BasePortalHost } from './portal';

    private $_destory = new Subject();
    private portaHost: DomPortalHost;

    @ViewChild('elRef') elRef: ElementRef;

    constructor (
        private elementRef: ElementRef,
        private injector: Injector,
        private appRef: ApplicationRef,
        private viewContainerRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ){}

    ngOnInit() {
        // 建立出口
        this.portaHost = new DomPortalHost(
            // this.elementRef.nativeElement as HTMLElement,
            this.elRef.nativeElement as HTMLElement,
            this.componentFactoryResolver,
            this.appRef,
            this.injector
        );

        const injectionTokens = new WeakMap();
        injectionTokens.set(PORTAL_CHILD_DATA, '传入的参数');

        //  建立对应的Portal
        const domPortal = new ComponentPortal(
            PortalChildComponent,
            this.viewContainerRef,
            new PortalInjector(this.injector, injectionTokens),
            this.componentFactoryResolver
        );

        // 附着
        const portalComponentRef: ComponentRef<PortalChildComponent> = this.portaHost.attachComponentPortal(domPortal);
        
        const eventEmitter: EventEmitter<string> = new EventEmitter;
        portalComponentRef.instance.outEvent = eventEmitter;

        eventEmitter.pipe(takeUntil(this.$_destory))
            .subscribe(event=>this.handlerPortalEvent(event));
    }  

    handlerPortalEvent(event){
        console.log('收到了Portal返回上来的事件信息:' + event);
    }

    ngOnDestroy(){
        this.$_destory.next();
        this.$_destory.complete();
    }
}
