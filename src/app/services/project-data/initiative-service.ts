import { Injectable } from '@angular/core';
import { Initiative } from '../../model/initiative';

/* tslint:disable:max-line-length */
const INITIATIVES = new Map<string, Initiative>([
    [
        'mgrb',
        {
            id: 'mgrb',
            title: 'Medical Genome Reference Bank',
            summary: 'Provide integrated genomic and phenotypic reference from 4000+ healthy elderly Australians.',
            aim: 'To maximise the efficiency of disease-specific genomic analyses in both the research and clinical setting.',
            methods: `Whole genome sequences from ~4,000 healthy, elderly (75+) Australian individuals will be analysed to 
            create a high quality database, depleted of damaging variants 
            that will act as a powerful filter to distinguish between causal and passenger genetic variation.`,
            outcome: `To generate a publically accessible data portal to provide the ideal background for the future 
            landscape of genomic research in Australia, and serve to facilitate 
            the transition and effectiveness of WGS into clinical practice.`,
            cohorts: ['aspree', 'over45'],
            people: ['margobarr', 'robertwells', 'robynwoods', 'johnmcneil'],
            genomes: '4000',
            sequenced: '3000',
            logo: 'assets/logos/mgrb.png',
            heights: [{'name': '30-40', 'x': 35, 'y': 0.0}, {'name': '40-50', 'x': 45, 'y': 0.0}, {'name': '50-60', 'x': 55, 'y': 0.0}, {'name': '60-70', 'x': 65, 'y': 1.0}, {'name': '70-80', 'x': 75, 'y': 3.0}, {'name': '80-90', 'x': 85, 'y': 1.0}, {'name': '90-100', 'x': 95, 'y': 0.0}, {'name': '100-110', 'x': 105, 'y': 1.0}, {'name': '110-120', 'x': 115, 'y': 0.0}, {'name': '120-130', 'x': 125, 'y': 1.0}, {'name': '130-140', 'x': 135, 'y': 3.0}, {'name': '140-150', 'x': 145, 'y': 95.0}, {'name': '150-160', 'x': 155, 'y': 827.0}, {'name': '160-170', 'x': 165, 'y': 1100.0}, {'name': '170-180', 'x': 175, 'y': 777.0}, {'name': '180-190', 'x': 185, 'y': 253.0}, {'name': '190-200', 'x': 195, 'y': 9.0}, {'name': '200-210', 'x': 205, 'y': 0.0}, {'name': '210-220', 'x': 215, 'y': 0.0}, {'name': '220-230', 'x': 225, 'y': 1.0}, {'name': '230-240', 'x': 235, 'y': 0.0}, {'name': '240-250', 'x': 245, 'y': NaN}],
            weights: [{'name': '0-40', 'x': 0, 'y': 0}, {'name': '30-40', 'x': 35, 'y': 5.0}, {'name': '40-50', 'x': 45, 'y': 65.0}, {
                'name': '50-60',
                'x': 55,
                'y': 378.0
            },
                {'name': '60-70', 'x': 65, 'y': 747.0}, {'name': '70-80', 'x': 75, 'y': 871.0}, {
                    'name': '80-90',
                    'x': 85,
                    'y': 596.0
                },
                {'name': '90-100', 'x': 95, 'y': 296.0}, {'name': '100-110', 'x': 105, 'y': 78.0}, {
                    'name': '110-120',
                    'x': 115,
                    'y': 36.0
                },
                {'name': '120-130', 'x': 125, 'y': 10.0}, {'name': '130-140', 'x': 135, 'y': 3.0}, {
                    'name': '140-150',
                    'x': 145,
                    'y': 1.0
                },
                {'name': '150-160', 'x': 155, 'y': 1.0}, {'name': '160-170', 'x': 165, 'y': 0.0}, {
                    'name': '170-180',
                    'x': 175,
                    'y': 1.0
                },
                {'name': '180-190', 'x': 185, 'y': 1.0}, {'name': '190-200', 'x': 195, 'y': NaN}],
            sex: [{name: 'Female', y: 1771}, {name: 'Male', y: 1352}],
            ages: [{'name': '0-5', 'x': 2.5, 'y': 0.0}, {'name': '5-10', 'x': 7.5, 'y': 0.0}, {'name': '10-15', 'x': 12.5, 'y': 0.0}, {'name': '15-20', 'x': 17.5, 'y': 0.0}, {'name': '20-25', 'x': 22.5, 'y': 0.0}, {'name': '25-30', 'x': 27.5, 'y': 0.0}, {'name': '30-35', 'x': 32.5, 'y': 0.0}, {'name': '35-40', 'x': 37.5, 'y': 0.0}, {'name': '40-45', 'x': 42.5, 'y': 0.0}, {'name': '45-50', 'x': 47.5, 'y': 0.0}, {'name': '50-55', 'x': 52.5, 'y': 0.0}, {'name': '55-60', 'x': 57.5, 'y': 0.0}, {'name': '60-65', 'x': 62.5, 'y': 0.0}, {'name': '65-70', 'x': 67.5, 'y': 0.0}, {'name': '70-75', 'x': 72.5, 'y': 424.0}, {'name': '75-80', 'x': 77.5, 'y': 568.0}, {'name': '80-85', 'x': 82.5, 'y': 1293.0}, {'name': '85-90', 'x': 87.5, 'y': 636.0}, {'name': '90-95', 'x': 92.5, 'y': 188.0}, {'name': '95-100', 'x': 97.5, 'y': 14.0}, {'name': '100-105', 'x': 102.5, 'y': 0.0}, {'name': '105-110', 'x': 107.5, 'y': NaN}]
        }
    ],
    [
        'nswgp',
        {
            id: 'nswgp',
            title: 'NSW Health Genomic Medical Research Grants',
            summary: 'Empowering researchers to translate the potential of genomic research into better health outcomes.',
            aim: 'Empower researchers to discover better health outcomes for diseases via genetic sequencing.',
            methods: `Grants and support to individual researchers enabling whole genome sequencing and translational genomic investigations.`,
            outcome: `Better health outcomes for various diseases including heart disease in babies, mitochondrial disease, metastatic melanoma, schizophrenia, retinal dystrophy, cardiomyopathies, mendelian immunodeficiencies, and epilepsy.`,
            cohorts: ['schizophrenia', 'mendelian_disorders', 'epilepsy', 'melanoma', 'mitochondrial', 'congenital', 'rare_disease', 'retinal', 'bone', 'cardiomyopathies', 'bipolar'],
            people: ['murraycairns', 'grahammann', 'carolynsue', 'sallydunwoodie'],
            genomes: '2295',
            sequenced: '1689',
            logo: '',
            heights: [],
            sex: [],
            weights: [],
            ages: []
        }
    ],
    [
        'gcmp',
        {
            id: 'gcmp',
            title: 'Genomic Cancer Medicine Program',
            summary: 'To expedite the translation of genomic discovery into improved health outcomes for cancer patients.',
            aim: 'To discover improved health outcomes for cancer patients.',
            methods: `Molecular screening and whole genome sequencing of more than a 1000 participants. Expedited clinical trials for patients with advanced disease.`,
            outcome: `Further understanding of the molecular basis of advanced disease and the discovery of novel gene variants. Facilitating personalized medicine and the ability to determine overall genetic cancer risk.`,
            cohorts: ['most', 'crs'],
            people: ['johnsimes', 'davidthomas', 'dominiquehess'],
            genomes: '2000',
            sequenced: '242',
            logo: '',
            heights: [],
            sex: [],
            weights: [],
            ages: []
        }
    ]
]);

@Injectable()
export class InitiativeService {
    getInitiatives(): Promise<Map<string, Initiative>> {
        return Promise.resolve(INITIATIVES);
    };

    getInitiative(id: string): Promise<Initiative> {
        return this.getInitiatives()
            .then(initiatives => initiatives.get(id));
    }
}
