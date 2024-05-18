import {Router} from 'express';
import scheduleController from '../controllers/scheduleController';

class SchedulesRoutes{

    public router: Router=Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', scheduleController.ListAllSchedules);
        this.router.get('/:Tid/:Pid', scheduleController.ListSchedulesPeriodTeacher);
        this.router.get('/:id', scheduleController.getSchedule);
        this.router.post('/', scheduleController.create);
        this.router.put('/:id', scheduleController.update);
        this.router.delete('/:id',scheduleController.delete);
    }

}

const schedulesRoutes = new SchedulesRoutes();

//Exportar unicamente el enrutador
export default schedulesRoutes.router;