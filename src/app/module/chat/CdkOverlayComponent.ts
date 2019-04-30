import { Component, ViewEncapsulation, ViewContainerRef, ViewChild, ElementRef } from "@angular/core";
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal, TemplatePortalDirective } from '@angular/cdk/portal';
import { OverlayPanelComponent } from './OverlayPanelComponent';

@Component({
    selector: 'app-cdk-overlay',
    template: `
        <!-- 全局显示 页面中心显示 (点击的时候显示) -->
        <button (click)="showOverlayGlobalPanelCenter()">页面中心显示</button>
        <button (click)="showNgTeplate()">显示Template</button>
        <button (click)="showOrigin()" #connectComponentOrigin>connectComponentOrigin</button>

        <button cdk-overlay-origin #trigger="cdkOverlayOrigin" (click)="isMenuOpen = !isMenuOpen">
            指令实现
        </button>

        <ng-template cdk-connected-overlay
                     [cdkConnectedOverlayOrigin]="trigger"
                     [cdkConnectedOverlayWidth]="500"
                     cdkConnectedOverlayHasBackdrop
                     [cdkConnectedOverlayOpen]="isMenuOpen"
                     (backdropClick)="isMenuOpen=false">
            <div class="menu-wrap">
                我是通过指令实现的Overlay
            </div>
        </ng-template>

        <ng-template cdk-portal #overlayGlobalTemplate="cdkPortal">
            <p class="template-overlay-pane"> ng-temtortelliniTemplateplate显示 </p>
        </ng-template>
    `,
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false,
})
export class CdkOverlayComponent {
    @ViewChild('overlayGlobalTemplate', {read: TemplatePortalDirective}) templateGlobalPortals;
    @ViewChild('connectComponentOrigin') connectComponentOrigin: ElementRef;

    constructor( public overlay: Overlay, public viewRef: ViewContainerRef){}

    showOverlayGlobalPanelCenter(){
        const config = new OverlayConfig();
        config.positionStrategy = this.overlay.position()
            .global()
            .centerVertically()
            .centerHorizontally();
        
        config.hasBackdrop = true;
        const overlayRef = this.overlay.create(config);

        overlayRef.backdropClick().subscribe(()=>overlayRef.dispose());

        overlayRef.attach(new ComponentPortal(OverlayPanelComponent, this.viewRef));
        overlayRef.keydownEvents().subscribe((event: KeyboardEvent)=>{
            console.info(event);
        });
    }
    showNgTeplate() {
        const config = new OverlayConfig();
        config.positionStrategy = this.overlay.position()
            .global().centerHorizontally().centerVertically();
        
        config.hasBackdrop = true;
        const overlayRef = this.overlay.create(config);
        overlayRef.backdropClick().subscribe(()=>overlayRef.dispose());

        overlayRef.attach(this.templateGlobalPortals);
    }

    showOrigin(){
        const strategy = this.overlay.position()
            .flexibleConnectedTo(this.connectComponentOrigin.nativeElement)
            .withPositions([{
                originX: 'center',
                originY: 'bottom',
                overlayX: 'center',
                overlayY: 'top',
                offsetX: 0,
                offsetY: 0
            }]);
        strategy.withLockedPosition(true);
        const config = new OverlayConfig({positionStrategy: strategy});
        config.scrollStrategy = this.overlay.scrollStrategies.reposition();
        config.hasBackdrop = true;

        const overlayRef = this.overlay.create(config);

        overlayRef.backdropClick().subscribe(()=>overlayRef.dispose());

        overlayRef.attach(new ComponentPortal(OverlayPanelComponent, this.viewRef));
    }
}