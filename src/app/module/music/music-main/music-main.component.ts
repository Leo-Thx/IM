import { Component, ViewChild, OnInit } from "@angular/core";
import { MatSlider } from '@angular/material';

@Component({
    selector: 'app-music-main',
    templateUrl: './music-main.html',
    styleUrls: ['./music-main.scss']
})
export class MusicMainComponent implements OnInit{
    @ViewChild('progressSlider') progressSlider: MatSlider;
    @ViewChild('volumeSlider') volumeSlider: MatSlider;

    ngOnInit(){
        // let elementRef = this.progressSlider._elementRef,
        //     nativeEl = elementRef.nativeElement;
        // let divEl = nativeEl.firstElementChild as HTMLElement;
        // divEl.style.top = '16px';

        let elementRef = this.volumeSlider._elementRef,
            nativeEl = elementRef.nativeElement;
        let sideWrapper = nativeEl.firstElementChild as HTMLElement;
        // sideWrapper.style.top = '16px';

        let thumb = sideWrapper.querySelector('.mat-slider-thumb') as HTMLDivElement;
        thumb.style.backgroundColor = '#464646';

        let thumbLabel = sideWrapper.querySelector('.mat-slider-thumb-label') as HTMLDivElement;
        thumbLabel.style.backgroundColor = '#464646';

        let trackFill = sideWrapper.querySelector('.mat-slider-track-fill') as HTMLDivElement;
        trackFill.style.backgroundColor = '#464646';
    }
}
