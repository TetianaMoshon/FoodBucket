import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from '../../client/api/auth.service';
import { bootstrapItem } from '@angular/cli/lib/ast-tools';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
    constructor(public auth: AuthService, public router: Router, private spinnerService: Ng4LoadingSpinnerService) {}
    canActivate(): any {
        this.spinnerService.show();
        this.auth.validation(sessionStorage.getItem('JWT') || '').subscribe(validation => {
            if (!validation.isValid) {
                this.router.navigate(['']);
                this.spinnerService.hide();
                return false;
            }
            this.spinnerService.hide();
            return true;

            /*return new Promise((resolve, reject) => {
               let validationVar = this.auth.validation(sessionStorage.getItem('JWT'));
            });*/
        });
    }
    canActivateChild(): boolean {
        return this.canActivate();
    }
}

