import {
    Component, OnInit, Input, EventEmitter, Output, OnDestroy, AfterViewInit,
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { TableService } from '../../../services/table-service';
import { Variant } from '../../../model/variant';
import { FilterService } from '../../../services/filter.service';

type FilterStream = [string, boolean];

@Component({
    selector: 'app-filter-auto',
    templateUrl: './filter-auto.component.html',
    styleUrls: ['./filter-auto.component.css'],
    providers: [FilterService]
})
export class FilterAutoComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() variants: Variant[];
    @Output() output: EventEmitter<Variant[]> = new EventEmitter();
    show = false;
    selectedIndex = 0;
    currentFilter = '';
    autoComplete: string[] = [];
    private filter: Subject<FilterStream> = new Subject<FilterStream>();
    private subscriptions: Subscription[] = [];
    private unfiltered: Variant[];

    constructor(private ts: TableService, private fs: FilterService) {

    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.unfiltered = this.variants;

        this.subscriptions.push(this.filter.debounceTime(120).subscribe(filterStream => {
            const filter = filterStream[0];
            const autocomplete = filterStream[1];

            if (autocomplete) {
                this.currentFilter = this.fs.clean(this.currentFilter + filter);
            } else {
                this.currentFilter = filter;
            }

            this.updateAutoComplete(this.currentFilter);

            if (this.fs.isCommand(this.currentFilter)) {
                if (this.fs.isValidCommand(this.currentFilter)) {
                    const variants = this.fs.filterVariants(this.currentFilter, this.unfiltered);
                    this.output.emit(variants);
                }
            } else {
                let variants: Variant[] = [];
                if (!filter) {
                    variants = this.unfiltered;
                } else {
                    variants = this.unfiltered.filter((v: Variant) => {
                        let found = false;
                        for (const k of this.ts.activeColumns()) {
                            let s = this.ts.display(k, v);
                            s = s.replace(/\s/g, '');
                            const r = new RegExp(filter.replace(/\s/g, '').replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
                            found = s.match(r) !== null;

                            if (found) {
                                break;
                            }
                        }
                        return found;
                    });
                }
                this.output.emit(variants);
            }
        }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    reset(variants: Variant[]) {
        this.variants = variants;
        this.unfiltered = this.variants;
        this.currentFilter = '';
    }

    onFilter(filter: string) {
        this.filter.next([filter, false]);
    }

    updateAutoComplete(s: string) {
        this.selectedIndex = 0;
        this.autoComplete.splice(0, this.autoComplete.length);

        const p: Promise<string[]> = Promise.resolve(this.fs.nextTokens(s));
        p.then(v => v.forEach(x => this.autoComplete.push(x)));
    }

    select() {
        this.filter.next([this.autoComplete[this.selectedIndex], true]);
    }

    onKeydown(event: KeyboardEvent) {
        if (event.code === 'ArrowUp' && this.selectedIndex > 0) {
            event.preventDefault();
            this.selectedIndex--;
        } else if (event.code === 'ArrowDown' && this.selectedIndex < this.autoComplete.length - 1) {
            event.preventDefault();
            this.selectedIndex++;
        } else if (event.code === 'Enter' && this.autoComplete.length > 0) {
            this.filter.next([this.autoComplete[this.selectedIndex], true]);
        }
    }

    onBlur() {
        this.show = false;
        this.selectedIndex = 0;
    }

    onFocus() {
        this.show = true;
        this.selectedIndex = 0;
    }

    highlight(i: number) {
        this.selectedIndex = i;
    }

}
