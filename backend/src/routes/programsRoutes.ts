import {Router} from 'express';
import programController from '../controllers/programController';

class ClientesRoutes{

    public router: Router=Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', programController.ListPrograms);
        this.router.get('/:id', programController.getProgram);
        this.router.post('/', programController.create);
        this.router.put('/:id', programController.update);
        this.router.put('/:id/:state',programController.changeState);
    }

}

const clientesRoutes = new ClientesRoutes();

//Exportar unicamente el enrutador
export default clientesRoutes.router;