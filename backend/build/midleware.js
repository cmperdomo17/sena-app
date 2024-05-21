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
exports.isTeacher = exports.isAdmin = exports.isUser = void 0;
const usersController_1 = __importDefault(require("./controllers/usersController"));
const lodash_1 = __importDefault(require("lodash"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = "$apr1$o46xadbi$mMunwZdccIJtOwYwCgbzg0";
function isUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Obtener el admin de la base de datos
        const admin = yield usersController_1.default.getUser(1);
        if (admin == null || admin === undefined) {
            return res.json({ mensaje: 'Admin no encontrado' });
        }
        const adminUser = {
            user_login: admin[0].user_login,
            user_pwd: admin[0].user_pwd,
            user_type: 1
        };
        const logUser = {
            user_login: req.body.user_login,
            user_pwd: req.body.user_pwd,
            user_type: 1
        };
        // Comparar la información del login con la obtenida de la base de datos
        if (lodash_1.default.isEqual(adminUser, logUser)) {
            // Si el usuario es el admin se le da acceso a las rutas
            logUser.user_type = 1;
            const token = generateToken(logUser);
            console.log('admin token:', token);
            // Se le da un token con una duracion de 3h
            res.json({ token: token, user_type: 1 });
            next();
        }
        else {
            try {
                //Traer el listado de usuarios de la base de datos
                const listUsers = yield usersController_1.default.ListUsers();
                //Usando el .find sobre ese listado buscar si las credenciales existen
                const teacherUser = listUsers.find((user) => user.user_login === logUser.user_login && user.user_pwd === logUser.user_pwd);
                //Si existe entonces hacer el generateToken y devolverlo
                if (teacherUser) {
                    teacherUser.user_type = 0;
                    const token = generateToken(teacherUser);
                    console.log('Teacher token: ', token);
                    res.json({ token: token, user_type: 0 });
                    next();
                }
                else {
                    //Si no exite devolver un error 404 - Usuario no encontrado
                    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
                }
            }
            catch (error) {
                console.error('Error al obtener la lista de usuarios:', error);
            }
        }
    });
}
exports.isUser = isUser;
function isAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //Si el usuario ya ha sido identificado como admin
        if (req.headers['auth']) {
            //Se verifica que posea el token de admin
            const token = Array.isArray(req.headers['auth']) ? req.headers['auth'][0] : req.headers['auth'];
            try {
                const decoded = jsonwebtoken_1.default.verify(token, secretKey);
                if (decoded.user_type === 1) {
                    next();
                }
                else {
                    return res.status(401).json({ mensaje: 'Usuario no autorizado' });
                }
            }
            catch (error) {
                return res.status(403).json({ mensaje: 'Token inválido' });
            }
        }
        else {
            return res.status(400).json({ mensaje: 'Token no proporcionado' });
        }
    });
}
exports.isAdmin = isAdmin;
function isTeacher(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //Si el usuario ya ha sido identificado como docente
        if (req.headers['auth']) {
            //Se verifica que posea el token de docente
            const token = Array.isArray(req.headers['auth']) ? req.headers['auth'][0] : req.headers['auth'];
            try {
                const decoded = jsonwebtoken_1.default.verify(token, secretKey);
                if (decoded.user_type === 0) {
                    req.body.user_id = decoded.user_id;
                    next();
                }
                else {
                    return res.status(401).json({ mensaje: 'Usuario no autorizado' });
                }
            }
            catch (error) {
                return res.status(403).json({ mensaje: 'Token inválido' });
            }
        }
    });
}
exports.isTeacher = isTeacher;
function generateToken(user) {
    return jsonwebtoken_1.default.sign(user, secretKey, { expiresIn: '3h' });
}
