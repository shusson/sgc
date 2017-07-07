import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Auth } from '../../../services/auth-service';
import { Subscription } from 'rxjs';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { SearchBarService } from '../../../services/search-bar-service';
import { AutocompleteResult } from '../../../model/autocomplete-result';
import { VariantSearchService } from '../../../services/variant-search-service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    providers: [SearchBarService]
})
export class SearchComponent implements OnDestroy {
    subscriptions: Subscription[] = [];
    autocomplete: AutocompleteResult<any>;
    error = '';
    searching = false;

    constructor(public searchBarService: SearchBarService,
                private auth: Auth,
                private route: ActivatedRoute,
                private cd: ChangeDetectorRef,
                router: Router) {
        if (!auth.authenticated()) {
            auth.lock.on('hide', () => {
                router.navigate(['/initiatives']);
            });
            auth.login();
        } else {
            this.subscriptions.push(route.params.subscribe(p => this.parseParams(p)));
        }
    }

    parseParams(params: Params) {
        if (!params['query']) {
            return;
        }
        this.error = '';
        this.autocomplete = null;
        this.searching = true;
        this.searchBarService.searchWithParams(params).then((v) => {
            this.autocomplete = v;
            this.cd.detectChanges();
        });
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s => s.unsubscribe()));
    }

    handleError(e: string) {
        this.error = e;
    }
}
