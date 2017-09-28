export class User {
    constructor(
        public userId: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: number,
        public city: string,
        public address: string,
        public active: boolean,
        public image: string,
    ) {}
}
