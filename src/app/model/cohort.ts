import { DistributionData } from './initiative';

export class Cohort implements DistributionData {
    id: string;
    link: string;
    title: string;
    summary: string;
    tags: string[];
    people: string[];
    genomes: string;
    sequenced: string;
    logos: string[];
    heights: any;
    weights: any;
    ages: any;
    sex: any;
}
