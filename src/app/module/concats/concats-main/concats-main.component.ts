import { Component } from "@angular/core";

@Component({
    selector: 'app-concats-main',
    templateUrl: './concats-main.html',
    styleUrls: [
        './concats-main.scss'
    ]
})
export class ConcatsMainComponent{
    public listArray = Array.from({length: 15}).fill(1);
    public statusArray = ['All', 'Online', 'Offline'];
    public activeStatus = 'All';

    public searchListWithStatus(status:'All'| 'Online' | 'Offline'){
        this.activeStatus = status;
    }
}
