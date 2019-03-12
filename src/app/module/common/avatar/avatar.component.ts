import { Component, Input } from "@angular/core";
import { IMsgExtendType } from 'src/app/model/msgType';

@Component({
    selector: 'avatar',
    templateUrl: './avatar.component.html',
    styleUrls: [
        './avatar.component.scss'
    ]
})
export class AvatarComponent {
    @Input() url: string;
    loaded(){}
    error(){}
    constructor() {
        
    }
}
