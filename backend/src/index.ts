import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config'
import { isAdmin } from './midleware';

import programsRoutes from './routes/programsRoutes';
import ambientsRoutes from './routes/ambientsRoutes';
import teachersRoutes from './routes/teachersRoutes';
import periodsRoutes from './routes/periodsRoutes';
import competenceRoutes from './routes/competenceRoutes';

class Server{

    public app: Application;

    constructor(){
        this.app=express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }   

    routes(): void {
        //Aqui es donde se colocan las rutas para las peticiones REST
        this.app.use('/api/programs',isAdmin,programsRoutes);
        this.app.use('/api/ambients',isAdmin,ambientsRoutes);
        this.app.use('/api/teachers',isAdmin,teachersRoutes);
        this.app.use('/api/periods',isAdmin,periodsRoutes);
        this.app.use('/api/competencies',isAdmin,competenceRoutes);
    }

    start(): void{
        this.app.listen(this.app.get('port'),()=>{
            console.log('Server on port', this.app.get('port'))
        });
    }
}

const server = new Server();
server.start();