import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';

@Component({
    selector: 'app-virtual-list-item',
    templateUrl: './virtual-list-item.component.html',
    styleUrls: ['./virtual-list-item.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualListItemComponent implements OnInit {

    constructor(public elf: ElementRef) {
    }

    ngOnInit() {
    }

}
