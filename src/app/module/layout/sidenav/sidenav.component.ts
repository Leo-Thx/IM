import { Component } from "@angular/core";

export interface SideNavMenu {
    icon: string;
    name?: string;
}

const menus = [
    {icon: 'message', name: '消息'},
    {icon: 'contacts', name: '联系人' },
    {icon: 'date_range', name: '待办'},
    {icon: 'email', name: '来往邮件'},
    {icon: 'library_music', name: '音乐'},
    {icon: 'settings_applications', last: true, name: '设置'}
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
