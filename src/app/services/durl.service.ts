import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const TIMEOUT = 3000;
@Injectable()
export class DurlService {

    constructor(public http: HttpClient) {
    }

    getDownloadUrl(): Observable<any> {
        const headers = new HttpHeaders()
            .append('Authorization', `Bearer ${localStorage.getItem('id_token')}`);

        return this.http.get(environment.durlUrl, {headers: headers})
            .timeout(TIMEOUT);
    }

}
