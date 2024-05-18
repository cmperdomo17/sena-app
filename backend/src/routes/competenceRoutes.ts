import {Router} from 'express';
import competenceController from '../controllers/competenceController';

class CompetenceRoutes{

    public router: Router=Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', competenceController.ListCompetencies);
        this.router.get('/:id/:type', competenceController.getCompetence);
        this.router.post('/', competenceController.create);
        this.router.put('/:id', competenceController.update);
        this.router.put('/:id/:state',competenceController.changeState);
        this.router.delete('/:id/:program_id',competenceController.delete);
    }

}

const competenceRoutes = new CompetenceRoutes();

//Exportar unicamente el enrutador
export default competenceRoutes.router;