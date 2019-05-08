import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    template: `
        <div class="main-container">
            <ng-container [ngSwitch]="type">
                <ng-container *ngSwitchCase="0">
                    <div mat-dialog-title>编辑群名称</div>
                    <mat-dialog-content>
                        <mat-form-field class="w-100">
                            <input matInput type="text" placeholder="">
                            <button mat-button matSuffix mat-icon-button aria-label="Clear">
                                <mat-icon>clear</mat-icon>
                            </button>
                        </mat-form-field>
                    </mat-dialog-content>
                </ng-container>
                
                <ng-container *ngSwitchCase="1">
                    <div mat-dialog-title>编辑群公告</div>
                    <mat-dialog-content>
                        <mat-form-field class="w-100">
                            <textarea matInput required rows="5" class="commetTextarea"></textarea>
                        </mat-form-field>
                    </mat-dialog-content>
                </ng-container>

                <ng-container *ngSwitchCase="2">
                    <div mat-dialog-title>编辑我的昵称</div>
                    <mat-dialog-content>
                        <mat-form-field class="w-100">
                            <input matInput type="text" placeholder="">
                            <button mat-button matSuffix mat-icon-button aria-label="Clear">
                                <mat-icon>clear</mat-icon>
                            </button>
                        </mat-form-field>
                    </mat-dialog-content>
                </ng-container>
            </ng-container>

            <mat-dialog-actions>
                <button mat-button mat-dialog-close>取消</button>
                <button mat-button [mat-dialog-close]="true">确认</button>
            </mat-dialog-actions>
        </div>
    `,
    styles: [
        // `.main-container .closebtn{ color: #C5C5C5; right:-24px; top:-24px;}`,
        `.main-container .mat-dialog-actions{justify-content: flex-end;}`,
        `.main-container .commetTextarea{ resize: none; }`
    ]
})
export class GroupEditDialog {
    public type: GroupEditType = GroupEditType.GROUP_NAME;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.type = data.type;
    }
}

export enum GroupEditType {
    GROUP_NAME,
    GROUP_NOTICE,
    GROUP_ALIAS
}