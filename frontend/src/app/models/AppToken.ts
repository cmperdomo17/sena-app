export class AppToken {

    private static instance: AppToken;
    private token: string = '';

    constructor () { }

    public static getInstance() {
        if(!this.instance) {
            this.instance = new AppToken();
        }
        return this.instance;
    }

    public setToken(token: string | null) {
        if(token) {
            this.token = token;
        }
    }

    public getToken() {
        return this.token;
    }
}