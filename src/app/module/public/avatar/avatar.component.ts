import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: [
        './avatar.component.scss'
    ]
})
export class AvatarComponent implements OnChanges{
    ngOnChanges(changes: SimpleChanges) {
        if(changes.isGroup && changes.isGroup.currentValue === true){
            this.showStatus = false;
        }
    }
    
    @Input() url: string;

    //是否显示状态
    @Input() showStatus: boolean;
    // 是否在线
    @Input() online: boolean;

    // 多人聊天
    @Input() isGroup: boolean = false;
    // 多个头像
    public urlSize: number;
    public _urls: string[];
    @Input()
    set urls( _arrs ) {
        this._urls = _arrs;
        this.urlSize = this._urls.length;
    }

    public _show = false;
    @Input()
    set showBadge(show){
        this._show = !!show;
    }

    public _count = 0;
    @Input()
    set badgeCount(count){
        this._count = count;
        if(this._count <= 0) this._show = false;
    }

    loaded(){}
    error(){}
    constructor() {}
}
