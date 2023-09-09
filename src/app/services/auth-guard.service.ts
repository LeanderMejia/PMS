import { Injectable, NgZone } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    constructor(private auth: Auth, private router: Router) { }

    canActivate() {
        const ngZone = new NgZone({ enableLongStackTrace: false });
        this.auth.onAuthStateChanged(user => {
            if (user) {
                ngZone.run(() => {
                    return true;
                });
            } else {
                ngZone.run(() => {
                   this.router.navigate(['login']);
                    return false;
                });
                
            }
        });
    }
}
