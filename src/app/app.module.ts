import 'rxjs/Rx';
import 'hammerjs';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
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
import { Ng2PaginationModule } from 'ng2-pagination';
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
import { MaterialModule } from '@angular/material';
import { BeaconNetworkService } from './services/beacon/beacon-network-service';
import { BeaconSearchService } from './services/beacon/beacon-search-service';
import { ChartModule } from 'angular2-highcharts';
import { HomeFooterComponent } from './components/parts/home-footer/home-footer.component';
import { HomeAboutComponent } from './components/parts/home-about/home-about.component';
import { PrivacyFooterComponent } from './components/parts/privacy-footer/privacy-footer.component';
import { ElasticGeneSearch } from './services/autocomplete/elastic-gene-search-service';
import { VariantsTableComponent } from './components/parts/variants-table/variants-table.component';
import { PositionService } from './services/autocomplete/position-service';
import { OverlayMenuComponent } from './components/parts/overlay-menu/overlay-menu.component';
import { ColumnsMenuComponent } from './components/parts/columns-menu/columns-menu.component';
import { ColumnService } from './services/column-service';
import { PcaPlotComponent } from './components/parts/pca-plot/pca-plot.component';
import { FilterAutoComponent } from './components/parts/filter-auto/filter-auto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageContainerComponent } from './components/parts/page-container/page-container.component';
import { RegionInformationComponent } from './components/parts/region-information/region-information.component';
import { DurlService } from './services/durl.service';
import { MgrbDownloadComponent } from './components/pages/mgrb-download/mgrb-download.component';
import { MgrbDownloadBannerComponent } from './components/parts/mgrb-download-banner/mgrb-download-banner.component';
import { LocalStorageService } from './services/local-storage.service';
import { environment } from '../environments/environment';
import { VariantComponent } from './components/pages/variant/variant.component';
import { BeaconTableComponent } from './components/parts/beacon-table/beacon-table.component';
import { VariantAnnotationsComponent } from './components/parts/variant-annotations/variant-annotations.component';
import { AnnoTreeComponent, JsonLabelPipe } from './components/parts/anno-tree/anno-tree.component';
import { VirtualListComponent } from './components/parts/virtual-list/virtual-list.component';
import { VirtualListItemComponent } from './components/parts/virtual-list-item/virtual-list-item.component';
import { AnalyticsComponent } from './components/pages/analytics/analytics.component';
import { SearchFilterComponent } from './components/parts/search-filter/search-filter.component';
import { SearchFilterItemComponent } from './components/parts/search-filter-item/search-filter-item.component';
import { SearchFilterParametersComponent } from './components/parts/search-filter-parameters/search-filter-parameters.component';
import { SearchFilterSelectComponent } from './components/parts/search-filter-select/search-filter-select.component';
import * as Raven from 'raven-js';
import { PopFreqsComponent } from './components/parts/pop-freqs/pop-freqs.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ErrorComponent } from './components/pages/error/error.component';
import { ScoresComponent } from './components/parts/scores/scores.component';
import { ConsequencesComponent } from './components/parts/consequences/consequences.component';

const CRITICAL_ERROR_WAIT_DURATION = 1000;

Raven
    .config(environment.sentryUrl)
    .install();

export class RavenErrorHandler implements ErrorHandler {
    handleError(err: any): void {
        if (!environment.production) {
            console.error(err);
        }
        Raven.captureException(err);
        window.setTimeout(() => {
            window.location.href = 'error';
        }, CRITICAL_ERROR_WAIT_DURATION);
    }
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        routing,
        HttpModule,
        MaterialModule,
        Ng2PaginationModule,
        NgxDatatableModule,
        ChartModule
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
        ColumnsMenuComponent,
        PcaPlotComponent,
        FilterAutoComponent,
        PageContainerComponent,
        RegionInformationComponent,
        MgrbDownloadComponent,
        MgrbDownloadBannerComponent,
        VariantComponent,
        BeaconTableComponent,
        VariantAnnotationsComponent,
        AnnoTreeComponent,
        JsonLabelPipe,
        VirtualListComponent,
        VirtualListItemComponent,
        PopFreqsComponent,
        ErrorComponent,
        ScoresComponent,
        ConsequencesComponent,
        AnalyticsComponent,
        SearchFilterComponent,
        SearchFilterItemComponent,
        SearchFilterParametersComponent,
        SearchFilterSelectComponent
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
        ColumnService,
        DurlService,
        LocalStorageService,
        { provide: ErrorHandler, useClass: RavenErrorHandler },
        { provide: 'NULL_VALUE', useValue: null }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
