import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-title-logo-banner',
    templateUrl: './title-logo-banner.component.html',
    styleUrls: ['./title-logo-banner.component.css']
})
export class TitleLogoBannerComponent implements OnInit {
    title = 'DISCOVERY';
    subtitle = 'A platform for exploring population scale genomics';

    constructor() {
    }

    ngOnInit() {
    }
}
