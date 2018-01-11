import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { VariantSearchService } from '../../../services/variant-search-service';
import { SearchBarService } from '../../../services/search-bar-service';
import { Gene } from '../../../model/gene';
import { Region } from '../../../model/region';
import { GenericAutocompleteResult } from '../../../model/autocomplete-result';

@Component({
    selector: 'app-gene-information',
    templateUrl: './gene-information.component.html',
    styleUrls: ['./gene-information.component.css', '../../../shared/meta-information.css']
})
export class GeneInformationComponent implements OnInit {
    @Input() total = 0;
    @Input() autocomplete: GenericAutocompleteResult<Gene>;

    constructor(public searchService: VariantSearchService,
                public searchBarService: SearchBarService) {
    }

    ngOnInit() {

    }

    geneLocation(gene: Gene) {
        const r = new Region(gene.chromosome, gene.start, gene.end);
        return r.name();
    }

}
