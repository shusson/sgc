import { CohortService } from './cohort-service';
import { Cohort } from '../../model/cohort';
describe('Cohort Service', () => {
    let cohortService: CohortService;

    beforeEach(() => {
       cohortService = new CohortService();
    });

    it('should get all the cohorts', () => {
        cohortService.getCohorts().then((cohorts: Map<String, Cohort>) => {
            expect(cohorts.size).toBeGreaterThan(0);
            expect(cohorts.get('aspree').title).toEqual('ASPREE');
        });
    });

    it('should get a single cohort', () => {
        cohortService.getCohort('aspree').then((cohort: Cohort) => {
            expect(cohort.title).toEqual('ASPREE');
        });
    });
});
