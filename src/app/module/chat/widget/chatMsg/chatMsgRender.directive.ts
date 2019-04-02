import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[ChatMsgRender]'
})
export class ChatMsgRenderDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
