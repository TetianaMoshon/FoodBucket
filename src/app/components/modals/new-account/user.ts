import {Register} from '../../../client/model/register';

export class User implements Register {

    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public phone: number,
        public city: string,
        public address: string,
        public image: string,
        public favourites: any,
        public active: boolean,
    ) {}
}
