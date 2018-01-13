import { Component } from '@angular/core';
import { Auth } from './services/auth-service';

@Component({
    selector: 'app-landing',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(auth: Auth) {
        auth.handleAuthentication();
    }
}
