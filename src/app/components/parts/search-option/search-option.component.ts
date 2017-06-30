import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import { SearchOption } from '../../../model/search-option';
import { SearchBarService } from '../../../services/search-bar-service';

@Component({
    selector: 'app-search-option',
    templateUrl: './search-option.component.html',
    styleUrls: ['./search-option.component.css']
})
export class SearchOptionComponent implements OnInit {
    @Input() option: SearchOption;
    showOptions = false;
    @HostListener('document:click', ['$event']) outsideClick($event: Event) {
        if (!$event) {
            return;
        }
        if (!this.elf.nativeElement.contains($event.target)) {
            this.showOptions = false;
        }
    }

    constructor(private elf: ElementRef, private searchBarService: SearchBarService) {
    }

    ngOnInit() {
    }

    selectOption(selected: string) {
        this.option.setValue(selected);
    }
}
