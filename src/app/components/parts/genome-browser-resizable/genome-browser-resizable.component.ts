import {
    Component, ElementRef, ChangeDetectorRef, AfterContentInit,
    HostListener, OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ScrollService } from '../../../services/scroll-service';
import { ElasticGeneSearch } from '../../../services/autocomplete/elastic-gene-search-service';

@Component({
    selector: 'app-genome-browser-resizable',
    templateUrl: './genome-browser-resizable.component.html',
    styleUrls: ['./genome-browser-resizable.component.css'],
})
export class GenomeBrowserResizeComponent implements AfterContentInit, OnDestroy {
    width: number;
    loading = true;
    error = '';
    private widths = new Subject<number>();
    private subscriptions: Subscription[] = [];

    @HostListener('window:resize') onResize() {
        this.widths.next(this.elf.nativeElement.firstChild.offsetWidth);
    }

    constructor(private elf: ElementRef,
                private scrollService: ScrollService,
                private cd: ChangeDetectorRef,
                private elastic: ElasticGeneSearch) {

    }


    initObservers() {
        this.scrollService.scrolled.subscribe(e => {
            let gb = document.getElementsByClassName('tnt_svg')[0];
            if (!gb) {
                return;
            }
            if (e) {
                document.getElementsByClassName('tnt_svg')[0].setAttribute('style', 'pointer-events: none;');
            } else {
                document.getElementsByClassName('tnt_svg')[0].setAttribute('style', 'pointer-events: auto;');
            }
        });
        this.subscriptions.push(this.widths
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(v => {
                // TODO: destroy component programatically instead of relying on ngif
                this.width = null;
                this.cd.detectChanges();
                this.width = v;
                this.cd.detectChanges();
            }));
    }

    ngAfterContentInit() {
        this.elastic.getChromosome('1')
            .toPromise()
            .then(() => {
                this.loading = false;
            })
            .catch(() => {
                this.error = 'Our genome browser is temporarily offline';
            })
            .then(() => {
                this.loading = false;
            });
        this.initObservers();
        this.onResize();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
