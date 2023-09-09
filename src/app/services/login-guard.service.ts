import { ApplicationRef, Injectable, NgZone } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class LoginGuardService {

    constructor(private auth: Auth, private router: Router, private applicationRef: ApplicationRef) { }

    canActivate() {
        const ngZone = new NgZone({ enableLongStackTrace: false });
        this.auth.onAuthStateChanged(user => {
            if (user) {
                ngZone.run(()=> {
                    this.router.navigate(['planted-trees']);
                    return false;
                });
            } else {
                ngZone.run(() => {
                    this.router.navigate(['']);
                    return true;
                });
            }
        });
    }
}
