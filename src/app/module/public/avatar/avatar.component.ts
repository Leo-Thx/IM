import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: [
        './avatar.component.scss'
    ]
})
export class AvatarComponent {
    @Input() url: string;

    @Input() showStatus: boolean;
    @Input() online: boolean;

    private _show = false;
    @Input()
    set showBadge(show){
        this._show = !!show;
    }

    private _count = 0;
    @Input()
    set badgeCount(count){
        this._count = count;
        if(this._count <= 0) this._show = false;
    }

    loaded(){}
    error(){}
    constructor() {}
}
