import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

    private messageSource = new BehaviorSubject<string>('Default msg');
    private isLogged = new BehaviorSubject<boolean>(true);

    currentMessage = this.messageSource.asObservable();
    currentIsLogged = this.isLogged.asObservable();

    constructor() { }
    changeMessage(message: string) {
        this.messageSource.next(message);
    }
    changeIsLogged(isLogged: boolean){
        this.isLogged.next(isLogged);
    }
}
