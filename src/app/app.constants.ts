import { environment } from '../environments/environment';

export const constants = {
    GARVAN_KCCG_LOGO: 'assets/logos/kccggarvan.png',
    PRIMARY_COLOR: '#003263',
    ORIGIN_URL: location.origin + '/' + environment.baseHref,
    GENERIC_ERROR_MESSAGE: 'There was an internal error and our team has been notified. ' +
    'In the meantime please try again or contact us at sgc@garvan.org.au'
};
