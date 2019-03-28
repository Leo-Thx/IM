import { Component, ViewChild, AfterViewInit, ViewChildren, QueryList } from "@angular/core";
import { MatNavList, MatListItem } from '@angular/material';

export interface SideNavMenu {
    icon: string;
    name?: string;
}

const menus = [
    {icon: 'message', name: '消息'},
    {icon: 'account_box', name: '联系人' },
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
export class SideNavComponent implements AfterViewInit{
    public menus: Array<SideNavMenu> = menus;

    @ViewChild(MatNavList) public matNavList: MatNavList;
    @ViewChildren('matListItem') public matListItem: QueryList<MatListItem>;

    constructor () {}

    ngAfterViewInit() {
        for(let matItem of this.matListItem.toArray() ){
            let hostEle = matItem._getHostElement(),
                firstEle = hostEle.firstElementChild;
            if( firstEle instanceof HTMLDivElement ) firstEle.style.justifyContent="center";
        }
        // console.info(this.menus);
    }
}
