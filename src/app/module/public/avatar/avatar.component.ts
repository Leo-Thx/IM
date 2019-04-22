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

    //是否显示状态
    @Input() showStatus: boolean;
    // 是否在线
    @Input() online: boolean;

    // 头像大小
    // @Input() size: number;

    // 是否有边框
    @Input() border: boolean = false;

    // 是否有阴影
    @Input() shadow: boolean = false;  

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
