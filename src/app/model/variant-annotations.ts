export class VariantXref {
    id: string;
    source: string;
}

export class VariantGeneExpression {
    geneName: string;
    transcriptId: string;
    experimentalFactor: string;
    factorValue: string;
    experimentId: string;
    technologyPlatform: string;
    expression: string;
    pvalue: number;
}

export class VariantSOTerm {
    accession: string;
    name: string;
}

export class VariantSubstitutionScores {
    score: number;
    source: string;
    description: string;
}

export class VariantProteinFeatures {
    id: string;
    start: number;
    end: number;
    type: string;
    description: string;
}

export class VariantProtein {
    uniprotAccession: string;
    uniprotName: string;
    uniprotVariantId: string;
    position: number;
    reference: string;
    alternate: string;
    functionalDescription: string;
    keywords: string;
    substitutionScores: VariantSubstitutionScores[];
    features: VariantProteinFeatures[];
}

export class VariantConsequenceType {
    geneName: string;
    ensemblGeneId: string;
    ensemblTranscriptId: string;
    strand: string;
    biotype: string;
    exonNumber: number;
    transcriptAnnotationFlags: string[];
    cdnaPosition: number;
    cdsPosition: number;
    codon: string;
    proteinVariantAnnotation: VariantProtein;
    sequenceOntologyTerms: VariantSOTerm[];
}

export class VariantPopulationFrequency {
    study: string;
    population: string;
    refAllele: string;
    altAllele: string;
    refAlleleFreq: number;
    altAlleleFreq: number;
    refHomGenotypeFreq: number;
    hetGenotypeFreq: number;
    altHomGenotypeFreq: number;
}

export class VariantScore {
    score: number;
    source: string;
    description: string;
}

export class VariantGeneTraitAssociation {
    id: string;
    name: string;
    hpo: string;
    score: number;
    numberOfPubmeds: number;
    associationTypes: string[];
    sources: string[];
    source: string;
}

export class VariantGeneDrugInteraction {
    geneName: string;
    drugName: string;
    source: string;
    studyType: string;
    type: string;
}

export class VAVariantTraitAssociation {
    // TODO
}

export class VariantAnnotation {
    ancestralAllele: string;
    minorAllele: string;
    minorAlleleFreq: number;
    displayConsequenceType: string;
    variantTraitAssociation: VAVariantTraitAssociation;
    xrefs: VariantXref[];
    geneExpression: VariantGeneExpression[];
    consequenceTypes: VariantConsequenceType[];
    populationFrequencies: VariantPopulationFrequency[];
    conservation: VariantScore[];
    geneTraitAssociation: VariantGeneTraitAssociation[];
    geneDrugInteraction: VariantGeneDrugInteraction[];
    functionalScore: VariantScore[];
}
