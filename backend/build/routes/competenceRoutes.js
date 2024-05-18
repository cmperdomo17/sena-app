"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const competenceController_1 = __importDefault(require("../controllers/competenceController"));
class CompetenceRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', competenceController_1.default.ListCompetencies);
        this.router.get('/:id/:type', competenceController_1.default.getCompetence);
        this.router.post('/', competenceController_1.default.create);
        this.router.put('/:id', competenceController_1.default.update);
        this.router.put('/:id/:state', competenceController_1.default.changeState);
        this.router.delete('/:id/:program_id', competenceController_1.default.delete);
    }
}
const competenceRoutes = new CompetenceRoutes();
//Exportar unicamente el enrutador
exports.default = competenceRoutes.router;
