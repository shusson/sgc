import { Injectable } from '@angular/core';
import { Variant, HOMOZYGOTES_KEY, HETEROZYGOTES_KEY } from '../../model/variant';
import * as d3 from 'd3';
import { Subject } from 'rxjs';
import { CttvService } from '../cttv-service';
import { VariantSearchService } from '../variant-search-service';
import { Region } from '../../model/region';
import { RegionAutocomplete } from '../../model/region-autocomplete';
import { RegionService } from '../autocomplete/region-service';
import { TrackService } from './track-service';
import { SearchFilterItem, SearchFilterItemSerialised } from '../../model/search-filter-item';

const PIN_COLOR = '#23b2c0';
const PIN_SELECTED_COLOR = '#355DCA';
const OVERLAY_COLOR = '#ff4539';

export type GenomeBrowserOverlay = 'None' | 'Homozygotes' | 'Heterozygotes' | 'DbSNP';

class VariantPin {
    constructor(public pos: number,
                public val: number,
                public name: string,
                public variant: Variant) {
    }
}

@Injectable()
export class VariantTrackService implements TrackService {
    track: any;
    trackLabel: any;
    highlightedVariant = new Subject<Variant>();
    clickedVariant = new Subject<Variant>();

    readonly overlays: GenomeBrowserOverlay[] = ['None', 'Homozygotes', 'Heterozygotes', 'DbSNP'];
    private activeOverlay: GenomeBrowserOverlay = 'None';
    private overlayMap: Map<GenomeBrowserOverlay, any> = new Map<GenomeBrowserOverlay, any>();
    private highlightCache: any = {};
    private createMethod: any;
    private pinFeature: any;

    constructor(private searchService: VariantSearchService,
                private regionService: RegionService) {
        this.pinFeature = tnt.board.track.feature.pin().fixed(this.drawYAxis);

        this.initCreateMethod();
        this.initOverlayMap();

        this.highlightedVariant.subscribe((v: Variant) => {
            v.highlight ? this.highlightPin(v) : this.unHighlightPin(v);
        });

        let data = this.createDataMethod();
        let display = this.createDisplayMethod();

        this.track = tnt.board.track()
            .height(100)
            .color('white')
            .display(display)
            .data(data);

        this.trackLabel = tnt.board.track()
            .label('MGRB Variants')
            .height(20)
            .color('white')
            .display(tnt.board.track.feature.block())
            .data(tnt.board.track.data.sync()
                .retriever(function (): any[] {
                    return [];
                })
            );
    }

    public setOverlay(overlay: GenomeBrowserOverlay) {
        if (this.overlayMap.has(overlay)) {
            this.overlayMap.get(overlay)(this.pinFeature);
            this.pinFeature.reset.apply(this.track);
            this.pinFeature.update.apply(this.track);
            this.activeOverlay = overlay;
        }
    }

    public getOverlay() {
        return this.activeOverlay;
    }

    private drawYAxis(this: any, width: number) {
        let labelSpacer = 10; // magic number comes from tnt.pin which is hardcoded for labels

        let domain = this.display().domain();
        let startRange = domain[0];
        let endRange = domain[1];
        let range = startRange + endRange;
        let midRange = (range / 2).toFixed(1);

        let left = 0;
        let marginLeft = 5;
        let top = labelSpacer;
        let bottom = this.height();
        let middle = (top + bottom) / 2;

        let drawText = (g: d3.Selection<any>, x: number, y: number, text: string) => {
            g.append('text')
                .attr('x', x)
                .attr('y', y)
                .attr('font-family', 'sans-serif')
                .attr('font-size', '15px')
                .attr('fill', 'grey')
                .text(text);
        };

        let drawLine = (g: d3.Selection<any>, x1: number, x2: number, y1: number, y2: number) => {
            g.append('line')
                .attr('x1', x1)
                .attr('x2', x2)
                .attr('y1', y1)
                .attr('y2', y2)
                .style('stroke', 'black')
                .style('stroke-width', '2px');
        };

        drawLine(this.g, left, left, top, bottom);

        drawText(this.g, marginLeft, top, endRange);
        drawLine(this.g, left, marginLeft, bottom, bottom);

        drawText(this.g, marginLeft, middle, midRange);
        drawLine(this.g, left, marginLeft, middle, middle);

        drawText(this.g, marginLeft, bottom, startRange);
        drawLine(this.g, left, marginLeft, top, top);
    }

    private createDisplayMethod(): () => any {
        let that = this;
        return this.pinFeature
            .domain([0, 1])
            .color(PIN_COLOR)
            .index((pin: VariantPin) => {
                return that.variantHash(pin.variant);
            })
            .on('click', function (this: any, pin: VariantPin) {
                that.clickedVariant.next(pin.variant);
            })
            .on('mouseover', function (this: any, pin: VariantPin) {
                if (!pin.variant.highlight) {
                    pin.variant.highlight = true;
                    that.highlightedVariant.next(pin.variant);
                }
            })
            .on('mouseout', function (this: any, pin: VariantPin) {
                if (pin.variant.highlight) {
                    pin.variant.highlight = false;
                    that.highlightedVariant.next(pin.variant);
                }
            })
            .layout(tnt.board.track.layout()
                .elements((elems: VariantPin[]) => {
                    CttvService.filterValuesAndLabelGroups(elems, that.pinFeature.scale());
                })
            );
    }

    private createDataMethod(): () => any {
        let createPin = (variant: Variant) => {
            return new VariantPin(
                variant.start,
                variant.variantStats[0] ? variant.variantStats[0].altAlleleFreq : 0,
                this.variantName(variant),
                variant
            );
        };
        return tnt.board.track.data.async()
            .retriever((loc: any) => {

                let region = new Region(String(this.searchService.lastQuery.chromosome),
                    loc.from,
                    loc.to
                );

                let regionAutocomplete = new RegionAutocomplete(
                    region,
                    region.name(),
                    '',
                    this.regionService
                );

                if (this.searchService.startingRegion.start !== loc.from ||
                    this.searchService.startingRegion.end !== loc.to) {
                    return regionAutocomplete.search(this.searchService, this.searchService.lastQuery.options, <SearchFilterItem[]>this.searchService.lastQuery.clinicalFilters).then(() => {
                        return Promise.resolve(this.searchService.variants.map(createPin));
                    });
                } else {
                    return Promise.resolve(this.searchService.variants.map(createPin));
                }
            });
    }

    private initCreateMethod() {
        let that = this;
        let create = this.pinFeature.create();
        this.createMethod = function (pins: any) {
            create.call(this, pins);
            pins.attr('data-variant-id', function (pin: VariantPin) {
                return that.variantHash(pin.variant);
            });
        };

        this.pinFeature.create(function (pins: any) {
            that.createMethod.call(this, pins);
        });
    }

    private initOverlayMap() {
        let that = this;
        this.overlayMap.set('None', (overlay: any) => {
            this.pinFeature.create(function (pins: any) {
                that.createMethod.call(this, pins);
            });
        });

        this.overlayMap.set('Homozygotes', (overlay: any) => {
            this.pinFeature.create(function (pins: any) {
                that.createMethod.call(this, pins);

                let homoz = pins.filter((d: VariantPin) => {
                    return d.variant.variantStats[0] ? d.variant.variantStats[0].genotypesCount[HOMOZYGOTES_KEY] : false;
                });
                homoz.select('line').attr('stroke', OVERLAY_COLOR);
                homoz.select('circle').attr('fill', OVERLAY_COLOR);
            });
        });

        this.overlayMap.set('Heterozygotes', (overlay: any) => {
            this.pinFeature.create(function (pins: any) {
                that.createMethod.call(this, pins);

                let hetz = pins.filter((d: VariantPin) => {
                    return d.variant.variantStats[0] ? d.variant.variantStats[0].genotypesCount[HETEROZYGOTES_KEY] : false;
                });
                hetz.select('line').attr('stroke', OVERLAY_COLOR);
                hetz.select('circle').attr('fill', OVERLAY_COLOR);
            });
        });

        this.overlayMap.set('DbSNP', (overlay: any) => {
            this.pinFeature.create(function (pins: any) {
                that.createMethod.call(this, pins);
                let dbSNPs = pins.filter((d: VariantPin) => {
                    return d.variant.dbSNP;
                });
                dbSNPs.select('line').attr('stroke', OVERLAY_COLOR);
                dbSNPs.select('circle').attr('fill', OVERLAY_COLOR);
            });
        });
    }

    private highlightPin(v: Variant) {
        let hash = this.variantHash(v);
        let e = <HTMLElement>d3.select(`[data-variant-id='${ hash }']`)[0][0];
        let dPin = d3.select(e);
        let circle = dPin.select('circle');

        if (circle.empty() || circle.attr('fill') === PIN_SELECTED_COLOR) {
            return;
        }

        this.highlightCache[hash] = circle.attr('fill');
        circle.attr('fill', PIN_SELECTED_COLOR)
            .attr('r', '10');
        let line = dPin.select('line');
        line.attr('stroke', PIN_SELECTED_COLOR)
            .attr('stroke-width', '3px');
    }

    private unHighlightPin(v: Variant) {
        let hash = this.variantHash(v);
        let e = <HTMLElement>d3.select(`[data-variant-id='${ hash }']`)[0][0];
        let dPin = d3.select(e);
        let circle = dPin.select('circle');

        if (circle.empty()) {
            return;
        }

        circle.attr('fill', this.highlightCache[hash])
            .attr('r', '5');
        let line = dPin.select('line');
        line.attr('stroke', this.highlightCache[hash])
            .attr('stroke-width', '1px');
    }

    private variantHash(variant: Variant) {
        let d = [
            variant.chromosome,
            variant.dbSNP,
            variant.variantStats,
            variant.alternate,
            variant.reference,
            variant.start,
            variant.type
        ];
        return window.btoa(JSON.stringify(d));
    }

    private variantName(variant: Variant) {
        return variant.chromosome +
            variant.start +
            variant.reference +
            variant.alternate +
            variant.type;
    }
}
