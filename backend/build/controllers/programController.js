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
class ProgramController {
    ListPrograms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL listPrograms()`;
            const programsList = yield new Promise((resolve, reject) => {
                database_1.default.query(sql, (err, rows, fields) => {
                    if (err)
                        reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(rows); // Si no, resolvemos con el resultado
                });
            });
            res.json(programsList[0]);
        });
    }
    getProgram(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL getProgram(?)`;
            const programsList = yield new Promise((resolve, reject) => {
                database_1.default.query(sql, [req.params.id], (err, rows, fields) => {
                    if (err)
                        reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(rows); // Si no, resolvemos con el resultado
                });
            });
            res.json(programsList[0]);
        });
    }
}
const programController = new ProgramController();
exports.default = programController;
