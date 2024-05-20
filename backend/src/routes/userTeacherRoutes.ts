import {Router} from 'express';
import userTeacherController from '../controllers/userTeacherController';

class UserTeachersRoutes{

    public router: Router=Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', userTeacherController.getTeacher);
        this.router.get('/:Pid', userTeacherController.ListSchedulesPeriodTeacher);
    }
}

const userteachersRoutes = new UserTeachersRoutes();

//Exportar unicamente el enrutador
export default userteachersRoutes.router;