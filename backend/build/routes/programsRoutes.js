"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const programController_1 = __importDefault(require("../controllers/programController"));
class ClientesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', programController_1.default.ListPrograms);
        this.router.get('/:id', programController_1.default.getProgram);
        //this.router.post('/', clientesController.create);
        //this.router.delete('/:id', clientesController.delete);
        //this.router.put('/:id', clientesController.update);
    }
}
const clientesRoutes = new ClientesRoutes();
//Exportar unicamente el enrutador
exports.default = clientesRoutes.router;
