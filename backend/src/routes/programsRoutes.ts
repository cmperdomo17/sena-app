import {Router} from 'express';
import programController from '../controllers/programController';

class ProgramsRoutes{

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

const programRoutes = new ProgramsRoutes();

//Exportar unicamente el enrutador
export default programRoutes.router;