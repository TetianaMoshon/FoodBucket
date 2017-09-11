import {Login} from '../../../client/model/login';

export class User implements Login {

    constructor(
        public email: string,
        public password: string
    ) {}
}
