import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { TableService } from '../../../services/column-service';
import { MatSlideToggleChange } from '@angular/material';

@Component({
    selector: 'app-columns-menu',
    templateUrl: './columns-menu.component.html',
    styleUrls: ['./columns-menu.component.css']
})
export class ColumnsMenuComponent implements OnInit {
    showList = false;

    @HostListener('document:click', ['$event']) outsideClick($event: Event) {
        if (!$event) {
            return;
        }
        if (!this.elf.nativeElement.contains($event.target)) {
            this.showList = false;
        } else {
            $event.stopImmediatePropagation();
            $event.stopPropagation();
        }
    }

    constructor(private elf: ElementRef,
                public ts: TableService) {
    }

    ngOnInit() {

    }

    switchValue(k: string, v: MatSlideToggleChange) {
        this.ts.set(k, v.checked);
    }

    toggle() {
        this.showList = !this.showList;
    }

}
