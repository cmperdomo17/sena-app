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
class UsersController {
    ListUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL listUsers()`;
            const usersList = yield new Promise((resolve, reject) => {
                database_1.default.query(sql, (err, rows) => {
                    if (err)
                        reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
            });
            return usersList[0];
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL getUser(?)`;
            const user = yield new Promise((resolve, reject) => {
                database_1.default.query(sql, [id], (err, rows) => {
                    if (err)
                        reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
            });
            return user[0];
        });
    }
    create(user_login, user_pwd) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL createUser(?, ?)`;
            yield database_1.default.query(sql, [user_login, user_pwd]);
        });
    }
    update(user_id, user_login, user_pwd) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL updateUser(?, ?, ?)`;
            yield database_1.default.query(sql, [user_id, user_login, user_pwd]);
        });
    }
    changeState(id, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `CALL changeStateUser(?, ?)`;
            yield database_1.default.query(sql, [id, state]);
        });
    }
}
const usersController = new UsersController();
exports.default = usersController;
