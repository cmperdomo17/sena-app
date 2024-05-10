import {Router} from 'express';
import ambientController from '../controllers/ambientsController';

class AmbientsRoutes{

    public router: Router=Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', ambientController.ListAmbients);
        this.router.get('/:id', ambientController.getAmbient);
        this.router.post('/', ambientController.create);
        this.router.put('/:id', ambientController.update);
        this.router.put('/:id/:state',ambientController.changeState);
    }

}

const ambientsRoutes = new AmbientsRoutes();

//Exportar unicamente el enrutador
export default ambientsRoutes.router;