import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

const TIMEOUT = 3000;
@Injectable()
export class DurlService {

    constructor(public http: Http) {
    }

    getDownloadUrl(): Observable<any> {
        let headers = new Headers();
        headers.append('Authorization', `Bearer ${localStorage.getItem('id_token')}`);

        return this.http.get(environment.durlUrl, {headers: headers})
            .timeout(TIMEOUT)
            .map((r: Response) => {
                if (!r.ok) {
                    throw new Error('An error occurred while trying to download your file');
                }
                return r.json();
            });
    }

}
