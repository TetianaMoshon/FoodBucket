import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from '../../client/api/auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {Observable} from "rxjs/Observable";


@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
    constructor(public auth: AuthService, public router: Router, private spinnerService: Ng4LoadingSpinnerService) {}
    canActivate(): boolean {
        /*this.spinnerService.show();
        this.auth.validation(sessionStorage.getItem('JWT') || '').subscribe(validation => {
            console.log(validation);
            if (validation.isValid) {
                this.spinnerService.hide();
                return true;
            }
            this.router.navigate(['']);
            this.spinnerService.hide();
            return false;
        });*/
        return true;
    }
    canActivateChild(): boolean {
        return this.canActivate();
    }
}

