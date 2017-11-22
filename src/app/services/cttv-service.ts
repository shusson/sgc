import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import * as tooltip from 'tnt.tooltip';

/*
 This file contains significant code from https://github.com/CTTV/targetGenomeBrowser.
 The code is used for displaying the gene transcript track, gene tooltip, adding
 labels for overlapping pins for the variant track and the legend of the gene transcript track.
 It has been modified to be written in Typescript and to be used as an injectable angular service.
 Various content values have also been changed like gene colors and content of tooltips.

 Copyright 2014-2016 EMBL - European Bioinformatics Institute, Wellcome
 Trust Sanger Institute and GlaxoSmithKline

 This software was developed as part of the Centre for Therapeutic
 Target Validation (CTTV)  project. For more information please see:

 http://about.targetvalidation.org

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

export const MAXIMUM_NUMBER_OF_VARIANTS = 10000;

@Injectable()
export class CttvService {

    static color: any = {
        'protein coding': '#8D001E',
        'pseudogene': '#000F1E',
        'processed transcript': '#2E8500',
        'ncRNA': 'lightcoral',
        'antisense': 'black',
        'TR gene': 'indigo',
        'non coding transcript': '#995A00',
    };

    static legend: any = {
        'protein_coding': 'protein coding',
        'pseudogene': 'pseudogene',
        'processed_pseudogene': 'pseudogene',
        'transcribed_processed_pseudogene': 'pseudogene',
        'unprocessed_pseudogene': 'pseudogene',
        'polymorphic_pseudogene': 'pseudogene',
        'unitary_pseudogene': 'pseudogene',
        'transcribed_unprocessed_pseudogene': 'pseudogene',
        'TR_V_pseudogene': 'pseudogene',
        'processed_transcript': 'processed transcript',
        'TEC': 'processed transcript',
        'sense_overlapping': 'processed transcript',
        'miRNA': 'ncRNA',
        'lincRNA': 'ncRNA',
        'misc_RNA': 'ncRNA',
        'snoRNA': 'ncRNA',
        'snRNA': 'ncRNA',
        'rRNA': 'ncRNA',
        'antisense': 'antisense',
        'sense_intronic': 'antisense',
        'TR_V_gene': 'TR gene',
        'TR_C_gene': 'TR gene',
        'TR_J_gene': 'TR gene',
        'TR_D_gene': 'TR gene',
        'retained_intron': 'non coding transcript',
        'nonsense_mediated_decay': 'protein coding',
    };

    static setupLegend(genes: any[], gene_legend_div: d3.Selection<any>) {
        let curr_biotypes = this.getBiotypes(genes);
        let biotype_legend = gene_legend_div.selectAll('.tnt_biotype_legend')
            .data(curr_biotypes, function (d: any) {
                return d.label;
            });

        let new_legend = biotype_legend
            .enter()
            .append('div')
            .attr('class', 'tnt_biotype_legend')
            .style('display', 'inline');

        new_legend
            .append('div')
            .style('display', 'inline-block')
            .style('margin', '0px 5px 0px 15px')
            .style('width', '10px')
            .style('height', '10px')
            .style('border', '1px solid #000')
            .style('background', function (d) {
                return d.color;
            });

        new_legend
            .append('text')
            .text(function (d) {
                return d.label;
            });

        biotype_legend
            .exit()
            .remove();

    };

    static getBiotypes(genes: any[]) {
        let biotypes_array: any[] = genes.map(function (e) {
            return CttvService.legend[e.biotype];
        });
        let transcript_biotypes: any[] = genes.map(function (e) {
            return CttvService.legend[e.biotype];
        });

        biotypes_array = biotypes_array.concat(transcript_biotypes);

        let biotypes_hash: any = {};
        for (let bioType of biotypes_array) {
            biotypes_hash[bioType] = 1;
        }
        let curr_biotypes: any[] = [];
        for (let p in biotypes_hash) {
            if (biotypes_hash.hasOwnProperty(p)) {
                let b: any = {};
                b.label = p;
                // noinspection TypeScriptValidateTypes
                b.color = d3.rgb(CttvService.color[p]);
                curr_biotypes.push(b);
            }
        }

        return curr_biotypes;
    };

    static geneColor(transcript: any) {
        let biotype: any = transcript.biotype;

        // noinspection TypeScriptValidateTypes
        let color = d3.rgb(CttvService.color[CttvService.legend[biotype]]);
        transcript.featureColor = color;

        for (let exon of transcript.exons) {
            exon.featureColor = color;
        }
    }

    static slotLayout(geneTrackHeight: number, track: any, browser: any) {
        return function (types: any, current: any) {
            let needed_height = types.expanded.needed_slots * types.expanded.slot_height;
            if (needed_height !== geneTrackHeight) {
                if (needed_height < 200) { // Minimum of 200
                    geneTrackHeight = 200;
                } else {
                    geneTrackHeight = needed_height;
                }
                geneTrackHeight = needed_height;
                track.height(needed_height);
                track.color('white');
                browser.tracks(browser.tracks()); // reorder re-computes track heights
            }
        };
    }

    static displayGeneTooltip(e: HTMLElement, gene: any) {
        let obj: any = {};


        obj.rows = [];

        obj.rows.push({
            'label': 'Name',
            'value': '<a target="blank" href="http://grch37.ensembl.org/Multi/Search/Results?q=' +
            gene.id +
            ';site=ensembl" >' +
            (gene.display_name || gene.external_name) +
            '(' +
            gene.id +
            ')' +
            '</a>'
        });
        obj.rows.push({
            'label': 'Biotype',
            'value': gene.biotype
        });
        obj.rows.push({
            'label': 'Location',
            'value': '<a target="_blank" href="http://grch37.ensembl.org/Homo_sapiens/Location/View?db=core;r=' +
            gene.seq_region_name +
            ':' +
            gene.start +
            '-' +
            gene.end +
            '">' +
            gene.seq_region_name +
            ':' +
            gene.start +
            '-' +
            gene.end +
            '</a>'
        });
        tooltip.table()
            .width(250)
            .call(e, obj);
    }

    static filterValuesAndLabelGroups(values: any[], xScale: any) {
        if (values.length > MAXIMUM_NUMBER_OF_VARIANTS) {
            values.length = 0;
            return;
        }

        const lim = 20;
        const deltaXLimit = (values.length / 1000) + 5;
        const deltaValLimit = 0.01;
        const filterLimit = 1000;
        const indexesToDelete: number[] = [];
        let indexToKeep = 0;
        values.map((d: any) => {
            d.label = '';
            d._px = xScale(d.pos);
        });
        values.sort((a: any, b: any) => {
            return a.pos - b.pos;
        });
        const groups: any[] = [];
        let currGroup: any[] = [values[0]];
        let curr: any = values[0];
        for (let i = 1; i < values.length; i++) {
            if ((values[i]._px - curr._px) < lim) {
                currGroup.push(values[i]);
                curr = values[i];
            } else {
                groups.push(currGroup);
                currGroup = [values[i]];
                curr = values[i];
            }

            if (values.length >= filterLimit) {
                // we filter out variants based on if they visually overlap.
                const deltaX = (values[i]._px - values[indexToKeep]._px);
                const deltaY = Math.abs((values[i].val - values[indexToKeep].val));
                if (deltaX < deltaXLimit && (deltaY < deltaValLimit)) {
                    indexesToDelete.push(i);
                } else {
                    indexToKeep = i;
                }
            }
        }

        let c = 0;
        for (let i = 0; i < indexesToDelete.length; i++) {
            values.splice(indexesToDelete[i] - c, 1);
            c++;
        }

        groups.push(currGroup);
        for (let g = 0; g < groups.length; g++) {
            if (groups[g].length > 1) {
                const med = groups[g][Math.floor(groups[g].length / 2)];
                med.label = '(' + groups[g].length + ')';
            }
        }
    }
}
