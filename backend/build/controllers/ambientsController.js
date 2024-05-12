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
class AmbientController {
    ListAmbients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL listAmbients()`;
            const ambientsList = yield new Promise((resolve, reject) => {
                database_1.default.query(sql, (err, rows, fields) => {
                    if (err)
                        reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
            });
            res.json(ambientsList[0]);
        });
    }
    getAmbient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL getAmbient(?)`;
            const ambient = yield new Promise((resolve, reject) => {
                database_1.default.query(sql, [req.params.id], (err, rows, fields) => {
                    if (err)
                        reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
            });
            res.json(ambient[0]);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL createAmbient(?, ?, ?, ?, ?)`;
            yield database_1.default.query(sql, [req.body.ambient_id,
                req.body.ambient_name,
                req.body.ambient_location,
                req.body.ambient_type,
                req.body.ambient_capacity]);
            res.json({ message: 'Ambient saved!' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL updateAmbient(?, ?, ?, ?, ?)`;
            yield database_1.default.query(sql, [req.params.id,
                req.body.ambient_name,
                req.body.ambient_location,
                req.body.ambient_type,
                req.body.ambient_capacity]);
            res.json({ message: 'Ambient updated!' });
        });
    }
    changeState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL changeStateAmbient(?, ?)`;
            yield database_1.default.query(sql, [req.params.id, req.params.state]);
            res.json({ message: 'Ambient state changed!' });
        });
    }
}
const ambientController = new AmbientController();
exports.default = ambientController;
