"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teachersController_1 = __importDefault(require("../controllers/teachersController"));
class TeachersRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', teachersController_1.default.ListTeachers);
        this.router.get('/:id', teachersController_1.default.getTeacher);
        this.router.post('/', teachersController_1.default.create);
        this.router.put('/:id', teachersController_1.default.update);
        this.router.put('/:id/:state', teachersController_1.default.changeState);
    }
}
const teachersRoutes = new TeachersRoutes();
//Exportar unicamente el enrutador
exports.default = teachersRoutes.router;
