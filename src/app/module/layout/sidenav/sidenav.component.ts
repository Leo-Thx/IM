import { Component } from "@angular/core";

export interface SideNavMenu {
    icon: string;
    name?: string;
}

const menus = [
    {icon: 'message', name: '当前聊天'},
    {icon: 'contacts', name: '联系人' },
    {icon: 'date_range', name: '日程'},
    {icon: 'email', name: '邮箱'},
    {icon: 'library_music', name: '音乐'},
    {icon: 'settings_applications', name: '设置'}
];

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: [
        './sidenav.component.scss'
    ]
})
export class SideNavComponent {
    public menus: Array<SideNavMenu> = menus;
    
    constructor () {
        
    }
}
