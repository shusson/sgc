import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const TIMEOUT = 3000;
const HEALTH_CHECK_URL = `${ environment.jhubUrl }`;

@Injectable()
export class JHubService {
    constructor(private http: Http) {}

    // healthCheck(): Promise<boolean> {
    //     return this.http.get(HEALTH_CHECK_URL)
    //         .timeout(TIMEOUT)
    //         .map((response: Response) => {
    //             if (!response.ok) {
    //                 throw new Error('Jupyter health check failed');
    //             }
    //             console.log(response.json());
    //         })
    //         .toPromise();
    // }

}
