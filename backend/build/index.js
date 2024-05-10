"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const programsRoutes_1 = __importDefault(require("./routes/programsRoutes"));
const ambientsRoutes_1 = __importDefault(require("./routes/ambientsRoutes"));
const teachersRoutes_1 = __importDefault(require("./routes/teachersRoutes"));
const periodsRoutes_1 = __importDefault(require("./routes/periodsRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        //Aqui es donde se colocan las rutas para las peticiones REST
        this.app.use('/api/programs', programsRoutes_1.default);
        this.app.use('/api/ambients', ambientsRoutes_1.default);
        this.app.use('/api/teachers', teachersRoutes_1.default);
        this.app.use('/api/periods', periodsRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
