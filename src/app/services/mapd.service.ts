import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class MapdService {
    session = null;

    constructor() {
    }

    connect(): Promise<any> {
        return new Promise((resolve, reject) => {
            new MapdCon()
                .protocol([environment.mapd.protocol])
                .host([environment.mapd.host])
                .port([environment.mapd.port])
                .dbName([environment.mapd.dbName])
                .user([environment.mapd.user])
                .password([environment.mapd.pwd])
                .connect((error, session) => {
                    if (error) {
                        reject(error);
                    } else {
                        this.session = session;
                        resolve(session);
                    }
                });
        });
    }

}
