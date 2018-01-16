import { ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Auth } from '../../../services/auth-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-explore',
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit, OnDestroy {
    show = false;
    subscriptions: Subscription[] = [];
    resize = new Subject<any>();

    @HostListener('window:orientationchange', ['$event'])
    orientationChange($event: Event) {
        this.resize.next();
    };

    // @HostListener('window:resize', ['$event']) resizeChange($event: Event) {
    //     this.resize.next();
    // };

    constructor(public auth: Auth,
                private cd: ChangeDetectorRef,
                private router: Router) {
    }

    ngOnInit() {
        this.show = true;
        this.subscriptions.push(this.resize.debounceTime(500).subscribe(() => {
            this.show = false;
            this.cd.detectChanges();
            this.show = true;
            this.cd.detectChanges();
        }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

}
