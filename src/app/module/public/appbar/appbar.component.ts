import { Component } from "@angular/core";
import { IpcService } from 'src/app/share/ipc/Ipc.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './appbar.component.html',
    styleUrls: [
        './appbar.component.scss'
    ]
})
export class AppTopBarComponent {
    constructor(public ipcSvc: IpcService) {}
    minimizable(){}
    // 关闭窗口
    closeWindow(){
        // this.ipcSvc.exitApp();
        alert(1111);
    }
    onClick(){
        alert(111);
    }
}
