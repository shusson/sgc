import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MapdFilterService } from './mapd-filter.service';

@Injectable()
export class MapdService {
    session = null;

    constructor(private mfs: MapdFilterService) {
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
                        session.getFields('mgrb', (err, res) => {
                            if (err) {
                                reject(error);
                            } else {
                                this.mfs.columns = res;
                                resolve(session);
                            }
                        });
                    }
                });
        });
    }

}
