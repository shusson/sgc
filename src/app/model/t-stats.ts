export class TStats {
    constructor(public dev = 0, public mean = 0, public n = 0) {}

    toString() {
        return JSON.stringify(this);
    }
}
