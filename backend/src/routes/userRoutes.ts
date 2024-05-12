import {Router} from 'express';

class UserRoutes{

    public router: Router=Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.post('/', this.hola);
    }

    hola() {
        console.log('log');
    }

}

const userRoutes = new UserRoutes();

//Exportar unicamente el enrutador
export default userRoutes.router;