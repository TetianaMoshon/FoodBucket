import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from '../../client/api/auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
    constructor(public auth: AuthService,
                public router: Router,
                private spinnerService: Ng4LoadingSpinnerService) {}
    canActivate():  Observable<boolean> | boolean {
        this.spinnerService.show();
        const observable = this.auth.validation(sessionStorage.getItem('JWT') || '').pluck('isValid');

        observable.subscribe(authenticated => {
            if (!authenticated) {
                this.router.navigate(['']);
                this.spinnerService.hide();
            } else {
                this.spinnerService.hide();
            }
        });
        return observable;
    }
    canActivateChild(): Observable<boolean> | boolean {
        return this.canActivate();
    }
}

