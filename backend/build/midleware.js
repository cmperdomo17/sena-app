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
exports.isAdmin = void 0;
const usersController_1 = __importDefault(require("./controllers/usersController"));
const lodash_1 = __importDefault(require("lodash"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = "$apr1$o46xadbi$mMunwZdccIJtOwYwCgbzg0";
function isAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //Si el usuario ya ha sido identificado como admin
        if (req.headers['auth']) {
            //Se verifica que posea el token de admin
            const token = Array.isArray(req.headers['auth']) ? req.headers['auth'][0] : req.headers['auth'];
            // const token = JSON.stringify(req.headers['auth']);
            // console.log('midelguartoken:',token);
            try {
                const decoded = jsonwebtoken_1.default.verify(token, secretKey);
                next();
            }
            catch (error) {
                return res.status(403).json({ mensaje: 'Token inválido' });
            }
        }
        else {
            // Obtener el admin de la base de datos
            const admin = yield usersController_1.default.getUser(1);
            if (admin == null || admin === undefined) {
                return res.json({ mensaje: 'Admin no encontrado' });
            }
            const adminUser = {
                user_login: admin[0].USER_LOGIN,
                user_pwd: admin[0].USER_PWD
            };
            const logUser = {
                user_login: req.body.user_login,
                user_pwd: req.body.user_pwd
            };
            // Comparar la información del login con la obtenida de la base de datos
            if (lodash_1.default.isEqual(adminUser, logUser)) {
                // Si el usuario es el admin se le da acceso a las rutas
                const token = generateToken(logUser);
                console.log('token:', token);
                // Se le da un token con una duracion de 3h
                res.json({ token: token });
                next();
            }
            else {
                return res.status(401).json({ mensaje: 'Usuario no autorizado' });
            }
        }
    });
}
exports.isAdmin = isAdmin;
function generateToken(user) {
    return jsonwebtoken_1.default.sign(user, secretKey, { expiresIn: '3h' });
}
