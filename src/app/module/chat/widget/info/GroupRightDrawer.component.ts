import { Component, ViewChild } from "@angular/core";
import { TemplatePortalDirective } from '@angular/cdk/portal';
import { OverlayConfig, Overlay } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material';
import { GroupEditDialog, GroupEditType } from '../dialog/GroupEditDialog.component';

@Component({
    templateUrl: './GroupRightDrawer.html',
    styleUrls: ['./GroupRightDrawer.scss']
})
export class GroupRightDrawerComponnet {
    public listArray = Array.from({length: 20}).fill(1);

    // @ViewChild('groupNameTmpl', {read: TemplatePortalDirective}) 
    // groupNameTmpl: TemplatePortalDirective;

    constructor(
        public overlay: Overlay, 
        public dialog: MatDialog) {}

    editGroupName() {
        // const config = new OverlayConfig();
        // config.positionStrategy = this.overlay.position()
        //     .global().centerHorizontally().centerVertically();
        
        // config.hasBackdrop = true;
        // const overlayRef = this.overlay.create(config);
        // overlayRef.backdropClick().subscribe(()=>overlayRef.dispose());

        // overlayRef.attach(this.groupNameTmpl);

        this.dialog.open(GroupEditDialog, {
            width: '400px',
            data: {
                type: GroupEditType.GROUP_NAME
            }
        });
    }

    editGroupNotice(){
        this.dialog.open(GroupEditDialog, {
            width: '400px',
            data: {
                type: GroupEditType.GROUP_NOTICE
            }
        });
    }
    editAlias(){
        this.dialog.open(GroupEditDialog, {
            width: '400px',
            data: {
                type: GroupEditType.GROUP_ALIAS
            }
        });
    }
}
