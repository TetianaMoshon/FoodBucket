export class UpdateUser {
    constructor(
        public firstName: string,
        public lastName: string,
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

