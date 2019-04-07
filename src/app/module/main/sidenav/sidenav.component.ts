import { Component, ViewChild, AfterViewInit, ViewChildren, QueryList, Output, EventEmitter } from "@angular/core";
import { MatNavList, MatListItem, MatSnackBar } from '@angular/material';
import { IpcService } from 'src/app/share/ipc/Ipc.service';
import { Router } from '@angular/router';

export interface SideNavMenu {
    icon: string;
    name?: string;
}

const menus = [
    {icon: 'chat_bubble_outline', name: '消息', to: 'chat'},
    {icon: 'account_circle', name: '联系人', to: 'concats' },
    {icon: 'notifications_none', name: '提醒', to: 'reminder'},
    // {icon: 'date_range', name: '待办', to: 'schedule'},
    // {icon: 'email', name: '我的邮箱', to: 'email'},
    {icon: 'library_music', name: '音乐', to: 'music'},
    
];

const settingMenu = {
    icon: 'settings', last: true, name: '设置'
};
const exitMenu = {
    icon: 'power_settings_new', name: '退出'
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
    public exitMenu = exitMenu;

    // 单击头像需要打开左侧抽屉以显示个人基本信息
    @Output('showPersonal') public showInfo = new EventEmitter<boolean>();

    @ViewChild(MatNavList) public matNavList: MatNavList;
    @ViewChildren('matListItem') public matListItem: QueryList<MatListItem>;

    constructor (
        public ipcSvc: IpcService, 
        public snackBar: MatSnackBar,
        public router: Router
    ) {}

    ngAfterViewInit() {
        // 侧边栏图标居中显示
        for(let matItem of this.matListItem.toArray() ){
            let hostEle = matItem._getHostElement(),
                firstEle = hostEle.firstElementChild;
            if( firstEle instanceof HTMLDivElement ) firstEle.style.justifyContent="center";
        }
    }

    logout(){
        // 清除所有缓存数据
        this.router.navigate(['/login']);
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

    openPersonalInfo(){
        this.showInfo.emit(true);
    }
}
