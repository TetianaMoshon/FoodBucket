import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

    private messageSource = new BehaviorSubject<string>('Default msg');
    private messageSourceLogBtn = new BehaviorSubject<string>('Log In / Registration');
    private isLogged = new BehaviorSubject<boolean>(true);
    private isAdmin = new BehaviorSubject(false);

    currentMessage = this.messageSource.asObservable();
    currentIsLogged = this.isLogged.asObservable();
    currentLogBtn = this.messageSourceLogBtn.asObservable();
    currentIsAdmin = this.isAdmin.asObservable();

    constructor() { }
    changeMessage(message: string) {
        this.messageSource.next(message);
    }
    changeIsLogged(isLogged: boolean) { this.isLogged.next(isLogged); }
    changeLogBtnText(text: string) { this.messageSourceLogBtn.next(text); }
    changeIsAdmin(isAdmin: boolean) { this.isAdmin.next(isAdmin);}
}
