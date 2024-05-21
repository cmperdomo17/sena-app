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
            localStorage.setItem("token", JSON.stringify(token));
        }else{
            localStorage.setItem("token",'');
        }
    }

    public getToken(){
        const tokenLocal = localStorage.getItem("token");
        return tokenLocal ? JSON.parse(tokenLocal) as string : "";
    }
}