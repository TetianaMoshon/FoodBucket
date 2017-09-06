import {Configuration} from './configuration';

export function apiConfig() {
    return new Configuration({
        basePath: 'http://localhost:3000/api',
    });
}
