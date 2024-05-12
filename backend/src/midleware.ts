import usersController from './controllers/usersController';
import {NextFunction, Request, Response } from 'express';
import { userModel } from './userModel';
import _ from 'lodash';
import jwt from 'jsonwebtoken';

const secretKey="$apr1$o46xadbi$mMunwZdccIJtOwYwCgbzg0";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {

    //Si el usuario ya ha sido identificado como admin
    if(req.headers['auth']){
        //Se verifica que posea el token de admin
        const token = JSON.stringify(req.headers['auth']);
        try {
            const decoded = jwt.verify(token, secretKey);
            next();
        } catch (error) {
            return res.status(403).json({ mensaje: 'Token inválido' });
        }
    }
    else{
        // Obtener el admin de la base de datos
        const admin = await usersController.getUser(1);
        console.log("hola");
        if (admin == null || admin === undefined) {
            return res.json({ mensaje: 'Admin no encontrado' });
        }

        const adminUser: userModel = {
            user_login: admin[0].USER_LOGIN,
            user_pwd: admin[0].USER_PWD
        }
        
        const logUser: userModel = {
            user_login: req.body.USER_LOGIN,
            user_pwd: req.body.USER_PWD
        }
        
        // Comparar la información del login con la obtenida de la base de datos
        if (_.isEqual(adminUser,logUser)) {
            // Si el usuario es el admin se le da acceso a las rutas
            const token = generateToken(logUser);
            // Se le da un token con una duracion de 3h
            res.set('auth',token);
            next();
        } else {
            return res.status(401).json({ mensaje: 'Usuario no autorizado' });
        }
    }
}

function generateToken(user: userModel){
    return jwt.sign(user, secretKey, { expiresIn: '3h' });
}