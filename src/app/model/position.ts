import { Region } from './region';

export class Position extends Region {
    constructor(c: string, public position: number) {
        super(c, position <= 50 ? 0 : position - 50, position <= 50 ? 50 : position + 50);
    }

    name() {
        return `${this.chromosome}:${this.position}`;
    }
}
