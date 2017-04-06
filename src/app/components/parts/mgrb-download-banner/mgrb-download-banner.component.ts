import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';

const BANNER_KEY = 'mgrb-download-closed';

@Component({
    selector: 'app-mgrb-download-banner',
    templateUrl: './mgrb-download-banner.component.html',
    styleUrls: ['./mgrb-download-banner.component.css']
})
export class MgrbDownloadBannerComponent implements OnInit {
    closed = '';
    constructor(public ls: LocalStorageService) {
        this.closed = ls.getItem(BANNER_KEY);
    }

    ngOnInit() {

    }

    close() {
        this.closed = 'true';
        this.ls.setItem(BANNER_KEY, this.closed);
    }

}
