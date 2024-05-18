"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const scheduleController_1 = __importDefault(require("../controllers/scheduleController"));
class SchedulesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', scheduleController_1.default.ListAllSchedules);
        this.router.get('/:Tid/:Pid', scheduleController_1.default.ListSchedulesPeriodTeacher);
        this.router.get('/:id', scheduleController_1.default.getSchedule);
        this.router.post('/', scheduleController_1.default.create);
        this.router.put('/:id', scheduleController_1.default.update);
        this.router.delete('/:id', scheduleController_1.default.delete);
    }
}
const schedulesRoutes = new SchedulesRoutes();
//Exportar unicamente el enrutador
exports.default = schedulesRoutes.router;
