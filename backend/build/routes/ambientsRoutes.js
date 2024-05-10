"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ambientsController_1 = __importDefault(require("../controllers/ambientsController"));
class AmbientsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', ambientsController_1.default.ListAmbients);
        this.router.get('/:id', ambientsController_1.default.getAmbient);
        this.router.post('/', ambientsController_1.default.create);
        this.router.put('/:id', ambientsController_1.default.update);
        this.router.put('/:id/:state', ambientsController_1.default.changeState);
    }
}
const ambientsRoutes = new AmbientsRoutes();
//Exportar unicamente el enrutador
exports.default = ambientsRoutes.router;
