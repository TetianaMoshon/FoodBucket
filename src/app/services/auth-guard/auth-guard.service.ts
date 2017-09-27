import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from '../../client/api/auth.service';
import {bootstrapItem} from '@angular/cli/lib/ast-tools';


@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {}
    canActivate(): boolean {
        /*this.auth.validation(sessionStorage.getItem('JWT')).subscribe(validation => {
            if (validation.isValid) {
                this.router.navigate(['']);
                return true;
            }
            return false;
        });*/
        debugger;
        return true;
    }
 /*   canActivateChild(): boolean {
        return this.canActivate();
    }*/
}

/*export class AuthGuardService implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {}
    canActivate(): any {
        this.auth.validation(sessionStorage.getItem('JWT')).subscribe(validation => {
            if (validation.isValid) {
                this.router.navigate(['']);
                return true;
            }
            return false;
        });
    }
}*/
