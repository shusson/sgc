import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { CttvService } from '../cttv-service';
import { TrackService } from './track-service';
import * as tnt from 'tnt.genome';

@Injectable()
export class TranscriptTrackService implements TrackService {
    track: any;
    trackLabel: any;

    init(genomeBrowser: any) {
        let gene_legend_div = d3.select(document.getElementById('genome-browser-gene-legend'));
        let mixedData = tnt.track.data.genome.transcript();
        let gene_updater = mixedData.retriever();
        mixedData.retriever(function (loc: any) {
            loc.chr = genomeBrowser.chr();
            loc.species = genomeBrowser.species();
            return gene_updater(loc)
                .then((genes: any) => {
                    genes.map(CttvService.geneColor);
                    CttvService.setupLegend(genes, gene_legend_div);
                    return genes;
                });
        });

        let geneTrackHeight = 0;
        this.track = tnt.track()
            .height(geneTrackHeight)
            .color('white')
            .display(tnt.track.feature.genome.transcript()
                .color(function (t: any) {
                    return t.featureColor;
                })
                .on('click', function (d: any) {
                    CttvService.displayGeneTooltip(this, d);
                })
            )
            .data(mixedData);

        this.track.display().layout()
            .keep_slots(false)
            .fixed_slot_type('expanded')
            .on_layout_run(CttvService.slotLayout(geneTrackHeight, this.track, genomeBrowser));

        this.trackLabel = tnt.track()
            // .label('Genes Transcripts')
            .height(5)
            .color('white')
            .display(tnt.track.feature.block())
            .data(tnt.track.data.sync()
                .retriever(function (): any[] {
                    return [];
                })
            );
    }
}
