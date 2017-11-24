import { environment } from '../environments/environment';

export const constants = {
    GARVAN_KCCG_LOGO: 'assets/logos/kccggarvan.png',
    PRIMARY_COLOR: '#003263',
    ORIGIN_URL: location.origin + '/' + environment.baseHref,
    GENERIC_SERVICE_ERROR_MESSAGE: 'There was an error connecting to one of our services.' +
    ' Please check your network and please try again or contact us at sgc@garvan.org.au'
};
