import { Component, OnInit } from '@angular/core';
import { Initiative } from '../../../model/initiative';
import { InitiativeService } from '../../../services/project-data/initiative-service';
import { SearchBarService } from '../../../services/search-bar-service';
import { Router } from '@angular/router';
import { ScrollService } from '../../../services/scroll-service';

@Component({
    selector: 'app-initiatives',
    templateUrl: './initiatives.component.html',
    styleUrls: ['./initiatives.component.css'],
    providers: [SearchBarService]
})
export class InitiativesComponent implements OnInit {
    initiatives: Initiative[];
    shadowStyle = {
        'background-color': 'rgba(0, 0, 0, 0)',
    };

    constructor(public scrollService: ScrollService,
                private initiativeService: InitiativeService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.initiativeService.getInitiatives().then((initiatives) => {
            this.initiatives = Array.from(<Iterable<Initiative>> initiatives.values());
        });

        this.scrollService.scrolled.subscribe(() => {
            let o = this.scrollService.currentScrollTop / 400;
            this.shadowStyle = {
                'background-color': `rgba(20, 20, 40, ${o})`,
            };
        });
    }

    search() {
        this.router.navigate(['/search']);
    }

}
