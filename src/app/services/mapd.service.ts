import { Injectable } from '@angular/core';

const protocol = 'https';
const host = 'vectis-api.com';
const port = '443';
const dbName = 'mapd';
const user = 'mapd';

@Injectable()
export class MapdService {
    session = null;

    constructor() {
    }

    connect(): Promise<any> {
        return new Promise((resolve, reject) => {
            new MapdCon()
                .protocol(['https'])
                .host(['vectis-api.com'])
                .port(['443'])
                .dbName(['mapd'])
                .user(['mapd'])
                .password(['HyperInteractive'])
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
