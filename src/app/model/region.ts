export class Region {
    constructor(public chromosome: string,
                public start: number,
                public end: number) {
    };

    name() {
        return `${this.chromosome}:${this.start}-${this.end}`;
    }
}
