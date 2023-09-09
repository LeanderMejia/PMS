import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent {

    credentialData = {
        email: '',
        password: ''
    };
    hasError = false;

    constructor(private auth: Auth, private router: Router) { }
    
    onSignIn(form: NgForm) {
        signInWithEmailAndPassword(this.auth, this.credentialData.email, this.credentialData.password)
            .then((userCredential) => {
                const user = userCredential.user;
                this.router.navigate(['planted-trees']);
            })
            .catch((error) => {
                form.resetForm();
                this.hasError = true;
                console.log(error.code, error.message);
            });
    }
}
