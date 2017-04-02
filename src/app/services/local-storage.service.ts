import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

    constructor() {
    }

    getItem(key: string) {
        return localStorage.getItem(key);
    }

    setItem(key: string, value) {
        return localStorage.setItem(key, value);
    }

}
