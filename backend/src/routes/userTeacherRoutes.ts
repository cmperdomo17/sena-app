import {Router} from 'express';
import userTeacherController from '../controllers/userTeacherController';

class UserTeachersRoutes{

    public router: Router=Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', userTeacherController.getTeacherT);
        this.router.post('/:Pid', userTeacherController.ListSchedulesPeriodTeacherT);
        this.router.get('/periods', userTeacherController.ListPeriodsT);
        this.router.get('/competencies', userTeacherController.ListCompetenciesT);
        this.router.get('/ambients', userTeacherController.ListAmbientsT);
    }
}

const userteachersRoutes = new UserTeachersRoutes();

//Exportar unicamente el enrutador
export default userteachersRoutes.router;