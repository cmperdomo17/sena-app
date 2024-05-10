"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const periodsController_1 = __importDefault(require("../controllers/periodsController"));
class PeriodsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', periodsController_1.default.ListPeriods);
        this.router.get('/:id', periodsController_1.default.getPeriod);
        this.router.post('/', periodsController_1.default.create);
        this.router.put('/:id', periodsController_1.default.update);
        this.router.put('/:id/:state', periodsController_1.default.changeState);
    }
}
const periodsRoutes = new PeriodsRoutes();
//Exportar unicamente el enrutador
exports.default = periodsRoutes.router;
