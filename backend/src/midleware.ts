import usersController from './controllers/usersController';
import {NextFunction, Request, Response } from 'express';
import { userModel } from './userModel';
import _ from 'lodash';
import jwt, { JwtPayload } from 'jsonwebtoken';

const secretKey="$apr1$o46xadbi$mMunwZdccIJtOwYwCgbzg0";

export async function isUser(req: Request, res: Response, next: NextFunction) {
    // Obtener el admin de la base de datos
    const admin = await usersController.getUser(1);
    if (admin == null || admin === undefined) {
        return res.json({ mensaje: 'Admin no encontrado' });
    }

    const adminUser: userModel = {
        user_login: admin[0].user_login,
        user_pwd: admin[0].user_pwd,
        user_type: 1
    }
    
    const logUser: userModel = {
        user_login: req.body.user_login,
        user_pwd: req.body.user_pwd,
        user_type: 1
    }
    
    // Comparar la información del login con la obtenida de la base de datos
    if (_.isEqual(adminUser,logUser)) {
        // Si el usuario es el admin se le da acceso a las rutas
        logUser.user_type=1;
        const token = generateToken(logUser);
        console.log('admin token:',token);
        // Se le da un token con una duracion de 3h
        res.json({token: token, user_type: 1});
        next();
    } else {
        try{
            //Traer el listado de usuarios de la base de datos
            const listUsers = await usersController.ListUsers();
            //Usando el .find sobre ese listado buscar si las credenciales existen
            const teacherUser = listUsers.find((user: userModel)=> user.user_login === logUser.user_login && user.user_pwd === logUser.user_pwd);
            //Si existe entonces hacer el generateToken y devolverlo
            if(teacherUser){
                teacherUser.user_type=0;
                const token = generateToken(teacherUser);
                console.log('Teacher token: ',token);
                res.json({token: token, user_type: 0});
                next();
            }else{  
                //Si no exite devolver un error 404 - Usuario no encontrado
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
        }catch(error){
            console.error('Error al obtener la lista de usuarios:', error);
        }
    }
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
    //Si el usuario ya ha sido identificado como admin
    if(req.headers['auth']){
        //Se verifica que posea el token de admin
        const token = Array.isArray(req.headers['auth']) ? req.headers['auth'][0] : req.headers['auth'];
        try {
            const decoded = jwt.verify(token, secretKey) as JwtPayload;
            if(decoded.user_type===1){
                next();
            }else{
                return res.status(401).json({ mensaje: 'Usuario no autorizado' });
            }
        } catch (error) {
            return res.status(403).json({ mensaje: 'Token inválido' });
        }
    }else{
        return res.status(400).json({ mensaje: 'Token no proporcionado' });
    }
}

export async function isTeacher(req: Request, res: Response, next: NextFunction) {
    //Si el usuario ya ha sido identificado como docente
    if(req.headers['auth']){
        //Se verifica que posea el token de docente
        const token = Array.isArray(req.headers['auth']) ? req.headers['auth'][0] : req.headers['auth'];
        try {
            const decoded = jwt.verify(token, secretKey) as JwtPayload;
            if(decoded.user_type===0){
                req.body.user_id=decoded.user_id;
                next();
            }else{
                return res.status(401).json({ mensaje: 'Usuario no autorizado' });
            }
        } catch (error) {
            return res.status(403).json({ mensaje: 'Token inválido' });
        }
    }
}

function generateToken(user: userModel){
    return jwt.sign(user, secretKey, { expiresIn: '3h' });
}