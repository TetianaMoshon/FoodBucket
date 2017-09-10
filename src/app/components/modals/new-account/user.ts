import {Register} from '../../../client/model/register';

export class User implements Register {

    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public city: string,
        public address: string,
    ) {}
}
