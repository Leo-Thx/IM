import { Component, Input } from "@angular/core";
import { MsgFileType } from 'src/app/model/msgType/FileType';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    template: `
    <span class="title block" [ngClass]="dirClass">你的名字<span class="time ml-1">12-03-12</span></span>
    <div class="flex p-mn-5 content" [ngClass]="dirClass">
        <mat-icon svgIcon="file_main"></mat-icon>
        <div class="detail ml-1">
            <h5 class="m-0">Tenacy Agreement.pdf</h5>
            <span>24kb Document</span>
        </div>
    </div>
    `,
    styleUrls: ['./ChatFileMsg.scss']
})
export class ChatFileMsgComponent {
    @Input('direction') public direction: string; 
    @Input('dirClass') public dirClass: Object;

    @Input() public data: MsgFileType;

    constructor( iconRegistry: MatIconRegistry, sanitizer: DomSanitizer ) {
        iconRegistry.addSvgIcon('file_main', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/chat/file_main.svg'));
    }
}
