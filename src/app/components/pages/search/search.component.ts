import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Auth } from '../../../services/auth-service';
import { Subscription } from 'rxjs';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { SearchBarService } from '../../../services/search-bar-service';
import { AutocompleteResult } from '../../../model/autocomplete-result';
import { VariantSearchService } from '../../../services/variant-search-service';
import { MdSnackBar } from '@angular/material';
import { SnackbarDemoComponent } from '../../parts/snackbar-demo/snackbar-demo.component';

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
                public snackBar: MdSnackBar,
                private router: Router) {
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
        if (params['demo']) {
            const sb = this.snackBar.openFromComponent(SnackbarDemoComponent, {
                extraClasses: ['snack-bar-demo-container'],
                verticalPosition: 'top'
            });
            sb.afterDismissed().subscribe(() => {
                this.searchBarService.search(params['query']);
            });
        } else {
            this.snackBar.dismiss();
        }
        this.error = '';
        this.autocomplete = null;
        this.searching = true;
        this.searchBarService.searchWithParams(params).then((v) => {
            this.autocomplete = v;
            this.cd.detectChanges();
        }).catch(() => {});
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s => s.unsubscribe()));
    }

    handleError(e: string) {
        this.error = e;
    }
}
