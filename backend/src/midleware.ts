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
        const token = Array.isArray(req.headers['auth']) ? req.headers['auth'][0] : req.headers['auth'];

        // const token = JSON.stringify(req.headers['auth']);
        // console.log('midelguartoken:',token);
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
        if (admin == null || admin === undefined) {
            return res.json({ mensaje: 'Admin no encontrado' });
        }

        const adminUser: userModel = {
            user_login: admin[0].USER_LOGIN,
            user_pwd: admin[0].USER_PWD
        }
        
        const logUser: userModel = {
            user_login: req.body.user_login,
            user_pwd: req.body.user_pwd
        }
        
        // Comparar la información del login con la obtenida de la base de datos
        if (_.isEqual(adminUser,logUser)) {
            // Si el usuario es el admin se le da acceso a las rutas
            const token = generateToken(logUser);
            console.log('token:',token);
            // Se le da un token con una duracion de 3h
            res.json({token: token});
            next();
        } else {
            return res.status(401).json({ mensaje: 'Usuario no autorizado' });
        }
    }
}

function generateToken(user: userModel){
    return jwt.sign(user, secretKey, { expiresIn: '3h' });
}