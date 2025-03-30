export class SearchOption {
    nonePlaceHolder = 'All';

    constructor(private name: string,
                public key: string,
                private options: string[],
                private value: string) {
    }

    display() {
        return `${ this.name }: ${ this.value ? this.value : this.nonePlaceHolder}`;
    }

    allOptions() {
        return this.options;
    }

    setValue(v: string) {
        if (this.options.indexOf(v) !== -1) {
            this.value = v;
        } else {
            this.value = '';
        }
    }

    getValue() {
        return this.value;
    }

    urlOption() {
        let r: any = {};
        r[this.key] = this.value;
        return r;
    }
}
