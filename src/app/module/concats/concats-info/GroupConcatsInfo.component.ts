import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-group-concats-info',
    templateUrl: './GroupConcatsInfo.html',
    styleUrls: [
        './GroupConcatsInfo.scss'
    ]
})
export class GroupConcatsInfoComponent {
    @Input('data') info: any;

    public listArray = Array.from({length: 100}).fill(1);
}