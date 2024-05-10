import {Router} from 'express';
import periodsController from '../controllers/periodsController';

class PeriodsRoutes{

    public router: Router=Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', periodsController.ListPeriods);
        this.router.get('/:id', periodsController.getPeriod);
        this.router.post('/', periodsController.create);
        this.router.put('/:id', periodsController.update);
        this.router.put('/:id/:state',periodsController.changeState);
    }

}

const periodsRoutes = new PeriodsRoutes();

//Exportar unicamente el enrutador
export default periodsRoutes.router;