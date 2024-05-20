"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const midleware_1 = require("./midleware");
const programsRoutes_1 = __importDefault(require("./routes/programsRoutes"));
const ambientsRoutes_1 = __importDefault(require("./routes/ambientsRoutes"));
const teachersRoutes_1 = __importDefault(require("./routes/teachersRoutes"));
const periodsRoutes_1 = __importDefault(require("./routes/periodsRoutes"));
const competenceRoutes_1 = __importDefault(require("./routes/competenceRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const scheduleRoutes_1 = __importDefault(require("./routes/scheduleRoutes"));
const userTeacherRoutes_1 = __importDefault(require("./routes/userTeacherRoutes"));
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
        this.app.use('/api/programs', midleware_1.isAdmin, programsRoutes_1.default);
        this.app.use('/api/ambients', midleware_1.isAdmin, ambientsRoutes_1.default);
        this.app.use('/api/teachers', midleware_1.isAdmin, teachersRoutes_1.default);
        this.app.use('/api/periods', midleware_1.isAdmin, periodsRoutes_1.default);
        this.app.use('/api/competencies', midleware_1.isAdmin, competenceRoutes_1.default);
        this.app.use('/api/schedules', midleware_1.isAdmin, scheduleRoutes_1.default);
        this.app.use('/login', midleware_1.isUser, userRoutes_1.default);
        this.app.use('/api/userTeacher', midleware_1.isTeacher, userTeacherRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
