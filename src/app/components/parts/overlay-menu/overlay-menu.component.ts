import { Component, OnInit } from '@angular/core';
import { VariantTrackService, GenomeBrowserOverlay } from '../../../services/genome-browser/variant-track-service';

@Component({
    selector: 'app-overlay-menu',
    templateUrl: './overlay-menu.component.html',
    styleUrls: ['./overlay-menu.component.css']
})
export class OverlayMenuComponent implements OnInit {

    overlays: GenomeBrowserOverlay[] = [];

    constructor(public variantTrack: VariantTrackService) {
        this.overlays = variantTrack.overlays;
    }

    ngOnInit() {

    }

    activateOverlay(overlay: GenomeBrowserOverlay) {
        this.variantTrack.setOverlay(overlay);
    }
}
