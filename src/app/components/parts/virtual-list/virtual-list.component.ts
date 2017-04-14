import {
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit,
    QueryList,
    ViewChildren
} from '@angular/core';
import { VirtualListItemComponent } from '../virtual-list-item/virtual-list-item.component';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

const LIST_WINDOW = 400;
const MIN_ITEMS = 50;
const MARGIN_OF_ERROR_ROWS = 2;

@Component({
    selector: 'app-virtual-list',
    templateUrl: './virtual-list.component.html',
    styleUrls: ['./virtual-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirtualListComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() items: any[];
    @ViewChildren(VirtualListItemComponent)
    private virtualItems: QueryList<VirtualListItemComponent>;
    visibleItems: any[];
    hiddenHeight = 0;
    end = MIN_ITEMS;
    windows: Subject<number> = new Subject<number>();
    private subs: Subscription[] = [];

    constructor(private elf: ElementRef,
                private cd: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.visibleItems = this.items.slice(0, this.end);
    }

    ngAfterViewInit() {
        this.updateEnd(0);
        this.subs.push(this.windows
            .distinctUntilChanged()
            .debounceTime(100)
            .subscribe((window: number) => {
                this.updateEnd(window);
            }));
    }

    onScroll(e: any) {
        let window = Math.floor(e.target.scrollTop / LIST_WINDOW);
        this.windows.next(window);
    }

    updateEnd(window: number) {
        let estimatedWidth = this.virtualItems.first.elf.nativeElement.clientWidth;
        let estimatedHeight = this.virtualItems.first.elf.nativeElement.clientHeight;
        let listWidth = this.elf.nativeElement.children[0].clientWidth;
        let maxItemsPerRow = Math.floor(listWidth / estimatedWidth);
        let maxRowsPerWindow = Math.ceil(LIST_WINDOW / estimatedHeight) + MARGIN_OF_ERROR_ROWS;
        let visibleItems = maxRowsPerWindow * maxItemsPerRow;
        this.end = visibleItems + (window * visibleItems);
        this.hiddenHeight = (this.items.length / maxItemsPerRow) * estimatedHeight;
        this.visibleItems = this.items.slice(0, this.end);
        this.cd.detectChanges();
    }

    ngOnDestroy() {
        this.subs.forEach(s => s.unsubscribe());
    }
}
