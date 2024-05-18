"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class CompetenceController {
    ListCompetencies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL listCompetencies()`;
            const competenciesList = yield new Promise((resolve, reject) => {
                database_1.default.query(sql, (err, rows, fields) => {
                    if (err)
                        reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
            });
            res.json(competenciesList[0]);
        });
    }
    getCompetence(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL getCompetence(?, ?)`;
            const competence = yield new Promise((resolve, reject) => {
                database_1.default.query(sql, [req.params.id, req.params.type], (err, rows, fields) => {
                    if (err)
                        reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
            });
            res.json(competence[0]);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL createCompetence(?, ?)`;
            yield database_1.default.query(sql, [req.body.competence_name,
                req.body.program_id]);
            res.json({ message: 'Competence saved!' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL updateCompetence(?, ?, ?)`;
            yield database_1.default.query(sql, [req.params.id,
                req.body.program_id,
                req.body.competence_name]);
            res.json({ message: 'Competence updated!' });
        });
    }
    changeState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL changeStateCompetence(?, ?, ?)`;
            yield database_1.default.query(sql, [req.params.id, req.body.competence_type, req.params.state]);
            res.json({ message: 'Competence state changed!' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL deleteCompetence(?, ?)`;
            yield database_1.default.query(sql, [req.params.id, req.params.program_id]);
            res.json({ message: 'Competence deleted!' });
        });
    }
}
const competenceController = new CompetenceController();
exports.default = competenceController;
