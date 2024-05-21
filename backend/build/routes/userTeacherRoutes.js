"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userTeacherController_1 = __importDefault(require("../controllers/userTeacherController"));
class UserTeachersRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', userTeacherController_1.default.getTeacherT);
        this.router.post('/:Pid', userTeacherController_1.default.ListSchedulesPeriodTeacherT);
        this.router.get('/periods', userTeacherController_1.default.ListPeriodsT);
    }
}
const userteachersRoutes = new UserTeachersRoutes();
//Exportar unicamente el enrutador
exports.default = userteachersRoutes.router;
