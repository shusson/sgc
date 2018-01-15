import { Injectable } from '@angular/core';
import { Variant, HOMOZYGOTES_KEY, HETEROZYGOTES_KEY } from '../../model/variant';
import * as d3 from 'd3';
import { Subject } from 'rxjs/Subject';
import { CttvService } from '../cttv-service';
import { VariantSearchService } from '../variant-search-service';
import { Region } from '../../model/region';
import { RegionAutocomplete } from '../../model/region-autocomplete';
import { RegionService } from '../autocomplete/region-service';
import { TrackService } from './track-service';
import * as tnt from 'tnt.genome';

const PIN_COLOR = '#4682b4';
const PIN_SELECTED_COLOR = '#FFD658';

export class VariantPin {
    constructor(public pos: number,
                public val: number,
                public name: string,
                public variant: Variant,
                public index: number) {
    }
}

@Injectable()
export class VariantTrackService implements TrackService {
    track: any;
    trackLabel: any;
    highlightedVariant = new Subject<VariantPin>();
    clickedVariant = new Subject<VariantPin>();
    data: any;
    private highlightCache: any = {};
    private createMethod: any;
    private pinFeature: any;

    constructor(private searchService: VariantSearchService,
                private regionService: RegionService) {
        this.pinFeature = tnt.track.feature.pin().fixed(this.drawYAxis);

        this.initCreateMethod();

        this.highlightedVariant.subscribe((vp: VariantPin) => {
            vp.variant.highlight ? this.highlightPin(vp) : this.unHighlightPin(vp);
        });

        this.data = this.createDataMethod();
        const display = this.createDisplayMethod();

        this.track = tnt.track()
            .height(100)
            .color('white')
            .display(display)
            .data(this.data);

        this.trackLabel = tnt.track()
            .label('MGRB Variants')
            .height(20)
            .color('white')
            .display(tnt.track.feature.block())
            .data(tnt.track.data.sync()
                .retriever(function (): any[] {
                    return [];
                })
            );
    }

    private drawYAxis(this: any, width: number) {
        const labelSpacer = 10; // magic number comes from tnt.pin which is hardcoded for labels

        const domain = this.display().domain();
        const startRange = domain[0];
        const endRange = domain[1];
        const range = startRange + endRange;
        const midRange = (range / 2).toFixed(1);

        const left = 0;
        const marginLeft = 5;
        const top = labelSpacer;
        const bottom = this.height();
        const middle = (top + bottom) / 2;

        const drawText = (g: d3.Selection<any>, x: number, y: number, text: string) => {
            g.append('text')
                .attr('x', x)
                .attr('y', y)
                .attr('font-family', 'sans-serif')
                .attr('font-size', '15px')
                .attr('fill', 'grey')
                .text(text);
        };

        const drawLine = (g: d3.Selection<any>, x1: number, x2: number, y1: number, y2: number) => {
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
        const that = this;
        return this.pinFeature
            .domain([0, 1])
            .color(PIN_COLOR)
            .index((pin: VariantPin) => {
                return pin.index;
            })
            .on('click', function (this: any, pin: VariantPin) {
                that.clickedVariant.next(pin);
            })
            .on('mouseover', function (this: any, pin: VariantPin) {
                if (!pin.variant.highlight) {
                    pin.variant.highlight = true;
                    that.highlightedVariant.next(pin);
                }
            })
            .on('mouseout', function (this: any, pin: VariantPin) {
                if (pin.variant.highlight) {
                    pin.variant.highlight = false;
                    that.highlightedVariant.next(pin);
                }
            })
            .layout(tnt.track.layout()
                .elements((elems: VariantPin[]) => {
                    CttvService.filterValuesAndLabelGroups(elems, that.pinFeature.scale());
                })
            );
    }

    private createDataMethod(): () => any {
        const createPin = (variant: Variant, index) => {
            return new VariantPin(
                variant.start,
                variant.af,
                this.variantName(variant),
                variant,
                index
            );
        };
        return tnt.track.data.async()
            .retriever((loc: any) => {

                const region = new Region(String(this.searchService.lastQuery.chromosome),
                    loc.from,
                    loc.to
                );

                const regionAutocomplete = new RegionAutocomplete(
                    region,
                    region.name(),
                    '',
                    this.regionService
                );

                if (this.searchService.filter !== null) {
                    return regionAutocomplete.search(this.searchService).then(() => {
                        return Promise.resolve(this.searchService.variants.map(createPin));
                    });
                } else {
                    return Promise.resolve(this.searchService.variants.map(createPin));
                }
            });
    }

    private initCreateMethod() {
        const that = this;
        const create = this.pinFeature.create();
        this.createMethod = function (pins: any) {
            create.call(this, pins);
            pins.attr('data-variant-index', function (pin: VariantPin) {
                return pin.index;
            });
        };

        this.pinFeature.create(function (pins: any) {
            that.createMethod.call(this, pins);
        });
    }

    private highlightPin(vp: VariantPin) {
        const e = <HTMLElement>d3.select(`[data-variant-index='${ vp.index }']`)[0][0];
        const dPin = d3.select(e);
        const circle = dPin.select('circle');

        if (circle.empty() || circle.attr('fill') === PIN_SELECTED_COLOR) {
            return;
        }

        this.highlightCache[vp.index] = circle.attr('fill');
        circle.attr('fill', PIN_SELECTED_COLOR)
            .attr('r', '10');
        const line = dPin.select('line');
        line.attr('stroke', PIN_SELECTED_COLOR)
            .attr('stroke-width', '3px');
    }

    private unHighlightPin(vp: VariantPin) {
        const e = <HTMLElement>d3.select(`[data-variant-index='${ vp.index }']`)[0][0];
        const dPin = d3.select(e);
        const circle = dPin.select('circle');

        if (circle.empty()) {
            return;
        }

        circle.attr('fill', this.highlightCache[vp.index])
            .attr('r', '5');
        const line = dPin.select('line');
        line.attr('stroke', this.highlightCache[vp.index])
            .attr('stroke-width', '1px');
    }

    private variantHash(variant: Variant) {
        const d = [
            variant.chr,
            variant.rsid,
            variant.af,
            variant.ac,
            variant.alt,
            variant.ref,
            variant.start,
            variant.nHet,
            variant.nHomVar,
        ];
        return window.btoa(JSON.stringify(d));
    }

    private variantName(variant: Variant) {
        return variant.chr +
            variant.start +
            variant.ref +
            variant.alt +
            variant.type;
    }
}
