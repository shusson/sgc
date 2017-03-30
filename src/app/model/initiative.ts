export interface DistributionData {
    heights: any;
    weights: any;
    ages: any;
    sex: any;
}

export class Initiative implements DistributionData {
    id: string;
    title: string;
    summary: string;
    aim: string;
    methods: string;
    outcome: string;
    cohorts: string[];
    people: string[];
    genomes: string;
    sequenced: string;
    logo: string;
    heights: any;
    weights: any;
    ages: any;
    sex: any;
}
