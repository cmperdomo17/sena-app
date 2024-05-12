import {Request, Response } from 'express';

import pool from '../database';

class AmbientController{
    public async ListAmbients (req: Request,res: Response){
        const sql=`CALL listAmbients()`;
        const ambientsList=await new Promise<any>((resolve, reject) => {
            pool.query(sql,
                (err: any, rows: any, fields: any) => {
                    if (err) reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
        });
        res.json(ambientsList[0]);
    }

    public async getAmbient (req: Request,res: Response){
        const sql=`CALL getAmbient(?)`;
        const ambient=await new Promise<any>((resolve, reject) => {
            pool.query(sql, [req.params.id],
                (err: any, rows: any, fields: any) => {
                    if (err) reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
        });
        res.json(ambient[0]);
    }

    public async create (req: Request,res: Response){
        const sql=`CALL createAmbient(?, ?, ?, ?, ?)`;
        await pool.query(sql, [req.body.ambient_id,
                                req.body.ambient_name,
                                req.body.ambient_location,
                                req.body.ambient_type,
                                req.body.ambient_capacity]);
        res.json({message: 'Ambient saved!'});
    }

    public async update (req: Request,res: Response){
        const sql=`CALL updateAmbient(?, ?, ?, ?, ?)`;
        await pool.query(sql, [req.params.id,
                                req.body.ambient_name,
                                req.body.ambient_location,
                                req.body.ambient_type,
                                req.body.ambient_capacity]);
        res.json({message: 'Ambient updated!'});
    }

    public async changeState (req: Request,res: Response){
        const sql=`CALL changeStateAmbient(?, ?)`;
        await pool.query(sql, [req.params.id,req.params.state]);
        res.json({message: 'Ambient state changed!'});
    }

}

const ambientController = new AmbientController();
export default ambientController;