
import { Beacon } from './beacon';
describe('Beacon', () => {

    it('determines its search parameters', () => {
        let beacon: Beacon = new Beacon({
            reference: 'HG19',
            chromosome: '1',
            position: '52065',
            allele: 'C'
        });
        let searchParams = beacon.getSearchParams();

        expect(searchParams.toString()).toEqual('ref=HG19&chrom=1&pos=52065&allele=C');
    });

});
