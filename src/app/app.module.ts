import 'hammerjs';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';

import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { ProgramCardComponent } from './components/parts/program-card/program-card.component';
import { CohortCardComponent } from './components/parts/cohort-card/cohort-card.component';
import { AboutComponent } from './components/pages/about/about.component';
import { InitiativesComponent } from './components/pages/initiatives/initiatives.component';
import { TotalsWidgetComponent } from './components/parts/totals-widget/totals-widget.component';
import { ColumnChartComponent } from './components/parts/charts/column-chart.component';
import { PieChartComponent } from './components/parts/charts/pie-chart.component';
import { CohortListComponent } from './components/parts/cohort-list/cohort-list.component';
import { GraphsWidgetComponent } from './components/parts/graphs-widget/graphs-widget.component';
import { InitiativeService } from './services/project-data/initiative-service';
import { CohortService } from './services/project-data/cohort-service';
import { SearchComponent } from './components/pages/search/search.component';
import { SearchResultsComponent } from './components/parts/search-results/search-results.component';
import { AlleleFreqComponent } from './components/parts/allele-freq/allele-freq.component';
import { VsalService } from './services/vsal-service';
import { GenomeBrowserComponent } from './components/parts/genome-browser/genome-browser.component';
import { Auth } from './services/auth-service';
import { RegionService } from './services/autocomplete/region-service';
import { SearchBarComponent } from './components/parts/search-bar/search-bar.component';
import { SearchOptionComponent } from './components/parts/search-option/search-option.component';
import { GenomeBrowserResizeComponent } from './components/parts/genome-browser-resizable/genome-browser-resizable.component';
import { BeaconComponent } from './components/pages/beacon/beacon.component';
import { SearchBarWithOptionsComponent } from './components/parts/search-bar-with-options/search-bar-with-options.component';
import { TitleLogoBannerComponent } from './components/parts/title-logo-banner/title-logo-banner.component';
import { MgrbComponent } from './components/pages/programmes/mgrb/mgrb.component';
import { NswgpComponent } from './components/pages/programmes/nswgp/nswgp.component';
import { GcmpComponent } from './components/pages/programmes/gcmp/gcmp.component';
import { MgrbTermsComponent } from './components/pages/mgrb-terms/mgrb-terms.component';
import { HeaderNavComponent } from './components/parts/header-nav/header-nav.component';
import { ScrollService } from './services/scroll-service';
import { SideNavComponent } from './components/parts/side-nav/side-nav.component';
import { EnsemblService } from './services/ensembl-service';
import { GeneInformationComponent } from './components/parts/gene-information/gene-information.component';
import { BeaconNetworkService } from './services/beacon/beacon-network-service';
import { HomeFooterComponent } from './components/parts/home-footer/home-footer.component';
import { HomeAboutComponent } from './components/parts/home-about/home-about.component';
import { PrivacyFooterComponent } from './components/parts/privacy-footer/privacy-footer.component';
import { ElasticGeneSearch } from './services/autocomplete/elastic-gene-search-service';
import { VariantsTableComponent } from './components/parts/variants-table/variants-table.component';
import { PositionService } from './services/autocomplete/position-service';
import { OverlayMenuComponent } from './components/parts/overlay-menu/overlay-menu.component';
import { TableService } from './services/table-service';
import { PcaPlotComponent } from './components/parts/pca-plot/pca-plot.component';
import { FilterAutoComponent } from './components/parts/filter-auto/filter-auto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageContainerComponent } from './components/parts/page-container/page-container.component';
import { RegionInformationComponent } from './components/parts/region-information/region-information.component';
import { LocalStorageService } from './services/local-storage.service';
import { environment } from '../environments/environment';
import { VariantComponent } from './components/pages/variant/variant.component';
import { BeaconTableComponent } from './components/parts/beacon-table/beacon-table.component';
import * as Raven from 'raven-js';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ErrorComponent } from './components/pages/error/error.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExploreComponent } from './components/pages/explore/explore.component';
import { DashboardComponent } from './components/parts/dashboard/dashboard.component';
import { VariantsTablePaginatedComponent } from './components/parts/variants-table-paginated/variants-table-paginated.component';
import { ErrorDialogComponent } from './components/parts/error-dialog/error-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ClinicalChartComponent } from './components/parts/clinical-chart/clinical-chart.component';
import { ClincalFilteringComponent } from './components/parts/clincal-filtering/clincal-filtering.component';
import { SnackbarDemoComponent } from './components/parts/snackbar-demo/snackbar-demo.component';
import { MaterialModule } from './app.material';
import { MapdRowChartComponent } from './components/parts/mapd-row-chart/mapd-row-chart.component';
import { MapdPieChartComponent } from './components/parts/mapd-pie-chart/mapd-pie-chart.component';
import { MapdAvgAfChartComponent } from './components/parts/mapd-avg-af-chart/mapd-avg-af-chart.component';
import { SummaryDialogComponent } from './components/parts/summary-dialog/summary-dialog.component';
import { HelpIconComponent } from './components/parts/help-icon/help-icon.component';
import { SnackbarHelpComponent } from './components/parts/snackbar-help/snackbar-help.component';
import { LoadingComponent } from './components/pages/loading/loading.component';
import { SignUpComponent } from './components/parts/sign-up/sign-up.component';
import { AuthGuardComponent } from './components/parts/auth-guard/auth-guard.component';

const CRITICAL_ERROR_WAIT_DURATION = 1000;

Raven
    .config(environment.sentryUrl)
    .install();

Raven.setDataCallback(function (data) {
    return data;
});

export class RavenErrorHandler implements ErrorHandler {
    handleError(err: any): void {
        if (!environment.production) {
            console.error(err);
        } else {
            Raven.captureException(err);
            window.setTimeout(() => {
                window.location.href = 'error';
            }, CRITICAL_ERROR_WAIT_DURATION);
        }
    }
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        HttpClientModule,
        NgxPaginationModule,
        NgxDatatableModule,
        MaterialModule
    ],
    declarations: [
        AppComponent,
        SearchBarComponent,
        SearchComponent,
        SearchResultsComponent,
        AlleleFreqComponent,
        ColumnChartComponent,
        ProgramCardComponent,
        CohortCardComponent,
        AboutComponent,
        InitiativesComponent,
        TotalsWidgetComponent,
        PieChartComponent,
        CohortListComponent,
        GraphsWidgetComponent,
        GenomeBrowserComponent,
        SearchOptionComponent,
        GenomeBrowserResizeComponent,
        BeaconComponent,
        SearchBarWithOptionsComponent,
        TitleLogoBannerComponent,
        MgrbComponent,
        NswgpComponent,
        GcmpComponent,
        MgrbTermsComponent,
        HeaderNavComponent,
        SideNavComponent,
        GeneInformationComponent,
        HomeFooterComponent,
        HomeAboutComponent,
        PrivacyFooterComponent,
        VariantsTableComponent,
        OverlayMenuComponent,
        PcaPlotComponent,
        FilterAutoComponent,
        PageContainerComponent,
        RegionInformationComponent,
        VariantComponent,
        BeaconTableComponent,
        ErrorComponent,
        ExploreComponent,
        DashboardComponent,
        VariantsTablePaginatedComponent,
        ErrorDialogComponent,
        ClinicalChartComponent,
        ClincalFilteringComponent,
        SnackbarDemoComponent,
        MapdRowChartComponent,
        MapdPieChartComponent,
        MapdAvgAfChartComponent,
        SummaryDialogComponent,
        HelpIconComponent,
        SnackbarHelpComponent,
        LoadingComponent,
        SignUpComponent,
        AuthGuardComponent,
    ],
    entryComponents: [
        SignUpComponent,
        ErrorDialogComponent,
        SummaryDialogComponent,
        SnackbarDemoComponent,
        SnackbarHelpComponent
    ],
    providers: [
        Auth,
        InitiativeService,
        CohortService,
        VsalService,
        ElasticGeneSearch,
        RegionService,
        BeaconNetworkService,
        ScrollService,
        EnsemblService,
        PositionService,
        TableService,
        LocalStorageService,
        { provide: ErrorHandler, useClass: RavenErrorHandler },
        { provide: 'NULL_VALUE', useValue: null }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
