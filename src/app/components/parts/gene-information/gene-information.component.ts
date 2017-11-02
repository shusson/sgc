import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { VariantSearchService } from '../../../services/variant-search-service';
import { Variant } from '../../../model/variant';
import { SearchBarService } from '../../../services/search-bar-service';
import { Gene } from '../../../model/gene';
import { Region } from '../../../model/region';
import { VariantRequest } from '../../../model/variant-request';
import { RegionService } from '../../../services/autocomplete/region-service';
import { Subscription } from 'rxjs/subscription';
import { AutocompleteResult } from '../../../model/autocomplete-result';

@Component({
    selector: 'app-gene-information',
    templateUrl: './gene-information.component.html',
    styleUrls: ['./gene-information.component.css', '../../../shared/meta-information.css']
})
export class GeneInformationComponent implements OnInit {
    @Input() variants: Variant[];
    @Input() autocomplete: AutocompleteResult<Gene>;

    constructor(public searchService: VariantSearchService,
                public searchBarService: SearchBarService) {
    }

    ngOnInit() {

    }

    geneLocation(gene: Gene) {
        let r = new Region(gene.chromosome, gene.start, gene.end);
        return r.name();
    }

}
