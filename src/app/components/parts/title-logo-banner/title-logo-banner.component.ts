import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-title-logo-banner',
    templateUrl: './title-logo-banner.component.html',
    styleUrls: ['./title-logo-banner.component.css']
})
export class TitleLogoBannerComponent implements OnInit {
    title = 'COHORTS AS A SERVICE';
    // subtitle = 'EMPOWERING YOUR DATA';

    constructor() {
    }

    ngOnInit() {
    }
}
