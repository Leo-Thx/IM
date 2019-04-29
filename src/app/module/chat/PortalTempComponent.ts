import { Component, ViewChild, TemplateRef, ElementRef, Injector, ApplicationRef, ViewContainerRef, ComponentFactoryResolver, OnInit } from "@angular/core";
import { DomPortalHost, TemplatePortal } from '@angular/cdk/portal';

@Component({
    selector: 'app-portal-tmpl',
    template: `
        <!-- 我们定义一个ng-template节点，并且需要传递一个参数 -->
        <ng-template #portalTemplate let-data>
            <div>参数: {{ data }}</div>
        </ng-template>
    `
})
export class PortalTemplateComponent implements OnInit{
    // 动态显示嵌入视图(Embedded View),由Template提供，和我们常说的ng-template标签对应
    @ViewChild('portalTemplate') portalTemplate: TemplateRef<any>;

    public constructor(
        public elementRef: ElementRef,
        private injector: Injector,
        private appRef: ApplicationRef,
        private viewRef: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ){}

    ngOnInit() {
        const portalHost = new DomPortalHost(
            this.elementRef.nativeElement as HTMLElement,
            this.componentFactoryResolver,
            this.appRef,
            this.injector
        );

        const templatePortal = new TemplatePortal(
            this.portalTemplate,
            this.viewRef,
            {
                $implicit:  '我是传递进入的数据'
            }
        );

        portalHost.attachTemplatePortal(templatePortal);
    }
}
