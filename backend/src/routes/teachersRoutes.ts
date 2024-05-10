import {Router} from 'express';
import teacherController from '../controllers/teachersController';

class TeachersRoutes{

    public router: Router=Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', teacherController.ListTeachers);
        this.router.get('/:id', teacherController.getTeacher);
        this.router.post('/', teacherController.create);
        this.router.put('/:id', teacherController.update);
        this.router.put('/:id/:state',teacherController.changeState);
    }

}

const teachersRoutes = new TeachersRoutes();

//Exportar unicamente el enrutador
export default teachersRoutes.router;