"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', this.hola);
    }
    hola() {
        console.log('log');
    }
}
const userRoutes = new UserRoutes();
//Exportar unicamente el enrutador
exports.default = userRoutes.router;
