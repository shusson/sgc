import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { InitiativesComponent } from './components/pages/initiatives/initiatives.component';
import { SearchComponent } from './components/pages/search/search.component';
import { BeaconComponent } from './components/pages/beacon/beacon.component';
import { GcmpComponent } from './components/pages/programmes/gcmp/gcmp.component';
import { NswgpComponent } from './components/pages/programmes/nswgp/nswgp.component';
import { MgrbComponent } from './components/pages/programmes/mgrb/mgrb.component';
import { MgrbTermsComponent } from './components/pages/mgrb-terms/mgrb-terms.component';
import { ModuleWithProviders} from '@angular/core';

const appRoutes: Routes = [
    { path: 'initiatives', component: InitiativesComponent },
    { path: 'about',  component: AboutComponent },
    { path: 'search/results', component: SearchComponent },
    { path: 'search', component: SearchComponent },
    { path: 'beacon', component: BeaconComponent },
    { path: 'initiatives/mgrb', component: MgrbComponent },
    { path: 'initiatives/nswgp', component: NswgpComponent },
    { path: 'initiatives/gcmp', component: GcmpComponent },
    { path: 'terms/mgrb', component: MgrbTermsComponent },
    { path: '', redirectTo: '/initiatives', pathMatch: 'full'},
    { path: '**', redirectTo: '/initiatives', pathMatch: 'full'},
];

export const routing = RouterModule.forRoot(appRoutes);
