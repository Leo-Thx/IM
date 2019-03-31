import { Component, ViewChild, AfterViewInit, ViewChildren, QueryList } from "@angular/core";
import { MatNavList, MatListItem, MatSnackBar } from '@angular/material';
import { IpcService } from 'src/app/share/ipc/Ipc.service';

export interface SideNavMenu {
    icon: string;
    name?: string;
}

const menus = [
    {icon: 'message', name: '消息', to: 'chat'},
    {icon: 'account_box', name: '联系人', to: 'concats' },
    {icon: 'date_range', name: '待办', to: ''},
    {icon: 'email', name: '来往邮件', to: 'email'},
    {icon: 'library_music', name: '音乐', to: 'music'},
    
];

const settingMenu = {
    icon: 'settings_applications', last: true, name: '设置'
};

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: [
        './sidenav.component.scss'
    ]
})
export class SideNavComponent implements AfterViewInit{
    public menus: Array<SideNavMenu> = menus;
    public settingMenu = settingMenu;

    @ViewChild(MatNavList) public matNavList: MatNavList;
    @ViewChildren('matListItem') public matListItem: QueryList<MatListItem>;

    constructor (public ipcSvc: IpcService, public snackBar: MatSnackBar) {}

    ngAfterViewInit() {
        // 侧边栏图标居中显示
        for(let matItem of this.matListItem.toArray() ){
            let hostEle = matItem._getHostElement(),
                firstEle = hostEle.firstElementChild;
            if( firstEle instanceof HTMLDivElement ) firstEle.style.justifyContent="center";
        }
    }

    exitApp(){
        this.ipcSvc.exitApp();
    }

    keepSlient(){
        let snackBarRef = this.snackBar.open('暂时不支持', '确定', {
            duration: 2000
        });

        snackBarRef.afterDismissed().subscribe(()=>{
            console.log('The snack-bar was dismissed');
        });
        snackBarRef.onAction().subscribe(() => {
            console.log('The snack-bar action was triggered!');
        });
        
    }
}
