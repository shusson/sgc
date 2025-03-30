import { Injectable } from '@angular/core';
import { Cohort } from '../../model/cohort';

/* tslint:disable:max-line-length */
const COHORTS = new Map<string, Cohort>([
    [
        'aspree',
        {
            id: 'aspree',
            link: 'http://www.aspree.org/aus/',
            title: 'ASPREE',
            summary: '',
            tags: ['healthy', 'disease free'],
            people: ['robynwoods', 'johnmcneil'],
            genomes: '2000',
            sequenced: '1700',
            logos: ['assets/logos/aspree.png', 'assets/logos/monash.png'],
            heights: [{'name': '30-40', 'x': 35, 'y': 0.0}, {'name': '40-50', 'x': 45, 'y': 0.0}, {
                'name': '50-60',
                'x': 55,
                'y': 0.0
            }, {'name': '60-70', 'x': 65, 'y': 0.0}, {'name': '70-80', 'x': 75, 'y': 0.0}, {
                'name': '80-90',
                'x': 85,
                'y': 0.0
            }, {'name': '90-100', 'x': 95, 'y': 0.0}, {'name': '100-110', 'x': 105, 'y': 0.0}, {
                'name': '110-120',
                'x': 115,
                'y': 0.0
            }, {'name': '120-130', 'x': 125, 'y': 0.0}, {'name': '130-140', 'x': 135, 'y': 1.0}, {
                'name': '140-150',
                'x': 145,
                'y': 78.0
            }, {'name': '150-160', 'x': 155, 'y': 624.0}, {'name': '160-170', 'x': 165, 'y': 717.0}, {
                'name': '170-180',
                'x': 175,
                'y': 477.0
            }, {'name': '180-190', 'x': 185, 'y': 99.0}, {'name': '190-200', 'x': 195, 'y': 2.0}, {
                'name': '200-210',
                'x': 205,
                'y': 0.0
            }, {'name': '210-220', 'x': 215, 'y': 0.0}, {'name': '220-230', 'x': 225, 'y': 0.0}, {
                'name': '230-240',
                'x': 235,
                'y': 0.0
            }, {'name': '240-250', 'x': 245, 'y': NaN}],
            weights: [{'name': '0-30', 'x': 0, 'y': 0}, {'name': '30-40', 'x': 35, 'y': 4.0}, {
                'name': '40-50',
                'x': 45,
                'y': 46.0
            }, {'name': '50-60', 'x': 55, 'y': 245.0}, {'name': '60-70', 'x': 65, 'y': 472.0}, {
                'name': '70-80',
                'x': 75,
                'y': 580.0
            }, {'name': '80-90', 'x': 85, 'y': 394.0}, {'name': '90-100', 'x': 95, 'y': 187.0}, {
                'name': '100-110',
                'x': 105,
                'y': 42.0
            }, {'name': '110-200', 'x': 195, 'y': 0}],
            ages: [{'name': '0-5', 'x': 2.5, 'y': 0.0}, {'name': '5-10', 'x': 7.5, 'y': 0.0}, {
                'name': '10-15',
                'x': 12.5,
                'y': 0.0
            }, {'name': '15-20', 'x': 17.5, 'y': 0.0}, {'name': '20-25', 'x': 22.5, 'y': 0.0}, {
                'name': '25-30',
                'x': 27.5,
                'y': 0.0
            }, {'name': '30-35', 'x': 32.5, 'y': 0.0}, {'name': '35-40', 'x': 37.5, 'y': 0.0}, {
                'name': '40-45',
                'x': 42.5,
                'y': 0.0
            }, {'name': '45-50', 'x': 47.5, 'y': 0.0}, {'name': '50-55', 'x': 52.5, 'y': 0.0}, {
                'name': '55-60',
                'x': 57.5,
                'y': 0.0
            }, {'name': '60-65', 'x': 62.5, 'y': 0.0}, {'name': '65-70', 'x': 67.5, 'y': 0.0}, {
                'name': '70-75',
                'x': 72.5,
                'y': 0.0
            }, {'name': '75-80', 'x': 77.5, 'y': 239.0}, {'name': '80-85', 'x': 82.5, 'y': 1110.0}, {
                'name': '85-90',
                'x': 87.5,
                'y': 508.0
            }, {'name': '90-95', 'x': 92.5, 'y': 132.0}, {'name': '95-100', 'x': 97.5, 'y': 11.0}, {
                'name': '100-105',
                'x': 102.5,
                'y': 0.0
            }, {'name': '105-110', 'x': 107.5, 'y': NaN}],
            sex: [{'name': 'Female', y: 1135}, {'name': 'Male', y: 865}]
        }
    ],
    [
        'over45',
        {
            id: 'over45',
            link: 'https://www.saxinstitute.org.au/our-work/45-up-study/',
            title: 'The 45 and Up Study',
            summary: '',
            tags: ['healthy', 'disease free'],
            people: ['margobarr', 'robertwells'],
            genomes: '2000',
            sequenced: '0',
            logos: ['assets/logos/sax_45.png'],
            heights: [{'name': '30-40', 'x': 35, 'y': 0.0}, {'name': '40-50', 'x': 45, 'y': 0.0}, {
                'name': '50-60',
                'x': 55,
                'y': 0.0
            }, {'name': '60-70', 'x': 65, 'y': 1.0}, {'name': '70-80', 'x': 75, 'y': 3.0}, {
                'name': '80-90',
                'x': 85,
                'y': 1.0
            }, {'name': '90-100', 'x': 95, 'y': 0.0}, {'name': '100-110', 'x': 105, 'y': 1.0}, {
                'name': '110-120',
                'x': 115,
                'y': 0.0
            }, {'name': '120-130', 'x': 125, 'y': 1.0}, {'name': '130-140', 'x': 135, 'y': 2.0}, {
                'name': '140-150',
                'x': 145,
                'y': 17.0
            }, {'name': '150-160', 'x': 155, 'y': 203.0}, {'name': '160-170', 'x': 165, 'y': 383.0}, {
                'name': '170-180',
                'x': 175,
                'y': 300.0
            }, {'name': '180-190', 'x': 185, 'y': 154.0}, {'name': '190-200', 'x': 195, 'y': 7.0}, {
                'name': '200-210',
                'x': 205,
                'y': 0.0
            }, {'name': '210-220', 'x': 215, 'y': 0.0}, {'name': '220-230', 'x': 225, 'y': 1.0}, {
                'name': '230-240',
                'x': 235,
                'y': 0.0
            }, {'name': '240-250', 'x': 245, 'y': NaN}],
            weights: [{'name': '0-30', 'x': 0, 'y': 0}, {'name': '30-40', 'x': 35, 'y': 1.0}, {
                'name': '40-50',
                'x': 45,
                'y': 19.0
            }, {'name': '50-60', 'x': 55, 'y': 133.0}, {'name': '60-70', 'x': 65, 'y': 275.0}, {
                'name': '70-80',
                'x': 75,
                'y': 291.0
            }, {'name': '80-90', 'x': 85, 'y': 202.0}, {'name': '90-100', 'x': 95, 'y': 109.0}, {
                'name': '100-110',
                'x': 105,
                'y': 36.0
            }, {'name': '110-120', 'x': 115, 'y': 17.0}, {'name': '120-130', 'x': 125, 'y': 6.0}, {
                'name': '130-140',
                'x': 135,
                'y': 1.0
            }, {'name': '140-150', 'x': 145, 'y': 1.0}, {'name': '150-160', 'x': 155, 'y': 1.0}, {
                'name': '160-170',
                'x': 165,
                'y': 0.0
            }, {'name': '170-180', 'x': 175, 'y': 1.0}, {'name': '180-190', 'x': 185, 'y': 1.0}, {
                'name': '190-200',
                'x': 195,
                'y': 0
            }],
            ages: [{'name': '0-5', 'x': 2.5, 'y': 0.0}, {'name': '5-10', 'x': 7.5, 'y': 0.0}, {
                'name': '10-15',
                'x': 12.5,
                'y': 0.0
            }, {'name': '15-20', 'x': 17.5, 'y': 0.0}, {'name': '20-25', 'x': 22.5, 'y': 0.0}, {
                'name': '25-30',
                'x': 27.5,
                'y': 0.0
            }, {'name': '30-35', 'x': 32.5, 'y': 0.0}, {'name': '35-40', 'x': 37.5, 'y': 0.0}, {
                'name': '40-45',
                'x': 42.5,
                'y': 0.0
            }, {'name': '45-50', 'x': 47.5, 'y': 0.0}, {'name': '50-55', 'x': 52.5, 'y': 0.0}, {
                'name': '55-60',
                'x': 57.5,
                'y': 0.0
            }, {'name': '60-65', 'x': 62.5, 'y': 0.0}, {'name': '65-70', 'x': 67.5, 'y': 0.0}, {
                'name': '70-75',
                'x': 72.5,
                'y': 424.0
            }, {'name': '75-80', 'x': 77.5, 'y': 329.0}, {'name': '80-85', 'x': 82.5, 'y': 183.0}, {
                'name': '85-90',
                'x': 87.5,
                'y': 128.0
            }, {'name': '90-95', 'x': 92.5, 'y': 56.0}, {'name': '95-100', 'x': 97.5, 'y': 3.0}, {
                'name': '100-105',
                'x': 102.5,
                'y': 0.0
            }, {'name': '105-110', 'x': 107.5, 'y': NaN}],
            sex: [{'name': 'Female', y: 636}, {'name': 'Male', y: 487}]
        }
    ],
    [
        'schizophrenia',
        {
            id: 'schizophrenia',
            link: '',
            title: 'Schizophrenia',
            summary: '',
            tags: ['schizophrenia', '2015'],
            people: ['murraycairns'],
            genomes: '500',
            sequenced: '',
            logos: ['assets/logos/una.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
    [
        'retinal',
        {
            id: 'retinal',
            link: '',
            title: ' Blinding Retinal Dystrophy',
            summary: '',
            tags: ['2016'],
            people: [],
            genomes: '',
            sequenced: '',
            logos: ['assets/logos/usyd.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
    [
        'melanoma',
        {
            id: 'melanoma',
            link: '',
            title: 'Metastatic Melanoma',
            summary: '',
            tags: ['Melanoma', '2015'],
            people: ['grahammann'],
            genomes: '500',
            sequenced: '',
            logos: ['assets/logos/westmead.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
    [
        'mitochondrial',
        {
            id: 'mitochondrial',
            link: '',
            title: 'Mitochondrial Disease',
            summary: '',
            tags: ['Mitochondrial', '2015'],
            people: ['carolynsue'],
            genomes: '500',
            sequenced: '',
            logos: ['assets/logos/kolling.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
    [
        'congenital',
        {
            id: 'congenital',
            link: '',
            title: 'Congenital Heart Disease',
            summary: '',
            tags: ['Mitochondrial', '2015'],
            people: ['sallydunwoodie'],
            genomes: '500',
            sequenced: '',
            logos: ['assets/logos/victorchang.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
    [
        'mendelian_disorders',
        {
            id: 'mendelian_disorders',
            link: '',
            title: 'Mendelian Disorders',
            summary: '',
            tags: ['2016'],
            people: ['tonros'],
            genomes: '',
            sequenced: '',
            logos: ['assets/logos/garvan-logo-sml.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        },
    ],
    [
        'rare_disease',
        {
            id: 'rare_disease',
            link: '',
            title: 'Rare Disease',
            summary: '',
            tags: ['2016'],
            people: ['tonros'],
            genomes: '',
            sequenced: '',
            logos: ['assets/logos/garvan-logo-sml.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        },
    ],
    [
        'epilepsy',
        {
            id: 'epilepsy',
            link: '',
            title: 'Epilepsy',
            summary: '',
            tags: ['2016'],
            people: ['tonros'],
            genomes: '',
            sequenced: '',
            logos: ['assets/logos/garvan-logo-sml.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
    [
        'bone',
        {
            id: 'bone',
            link: '',
            title: 'Genetic Disorders of Bone',
            summary: '',
            tags: ['2016'],
            people: [''],
            genomes: '',
            sequenced: '',
            logos: ['assets/logos/schn.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
    [
        'cardiomyopathies',
        {
            id: 'cardiomyopathies',
            link: '',
            title: 'Inherited Cardiomyopathies',
            summary: '',
            tags: ['2016'],
            people: [''],
            genomes: '',
            sequenced: '',
            logos: ['assets/logos/usyd.png', 'assets/logos/cilr.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
    [
        'most',
        {
            id: 'most',
            link: '',
            title: 'MoST',
            summary: '',
            tags: [],
            people: ['johnsimes', 'davidthomas', 'dominiquehess'],
            genomes: '1000',
            sequenced: '0',
            logos: ['assets/logos/nhmrc.png', 'assets/logos/usyd.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
    [
        'crs',
        {
            id: 'crs',
            link: '',
            title: 'Cancer Risk Study',
            summary: '',
            tags: [],
            people: ['davidthomas', 'johnsimes', 'dominiquehess'],
            genomes: '1000',
            sequenced: '0',
            logos: ['assets/logos/lifehouse.png', 'assets/logos/garvan-logo-sml.png', 'assets/logos/svhs.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
    [
        'bipolar',
        {
            id: 'bipolar',
            link: '',
            title: 'Bipolar Disorder',
            summary: '',
            tags: ['2017'],
            people: [''],
            genomes: '',
            sequenced: '',
            logos: ['assets/logos/pow.png', 'assets/logos/neura.png', 'assets/logos/black_dog.png', 'assets/logos/unsw.png'],
            heights: [],
            weights: [],
            ages: [],
            sex: []
        }
    ],
]);

@Injectable()
export class CohortService {

    getCohorts(): Promise<Map<string, Cohort>> {
        return Promise.resolve(COHORTS);
    };

    getCohort(id: string): Promise<Cohort> {
        return this.getCohorts()
            .then(cohorts => cohorts.get(id));
    }
}
