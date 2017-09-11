export class UserModel {

    constructor(
        public first_name: string,
        public last_name: string,
        public email: string,
        public password: string,
        public phone: number,
        public city: string,
        public address: string,
        public image: string,
        public favourites = [],
        public active =  true,
    ) {}
}
