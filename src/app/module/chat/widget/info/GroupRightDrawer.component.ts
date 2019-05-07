import { Component } from "@angular/core";

@Component({
    templateUrl: './GroupRightDrawer.html',
    styleUrls: ['./GroupRightDrawer.scss']
})
export class GroupRightDrawerComponnet {
    public listArray = Array.from({length: 20}).fill(1);
}
