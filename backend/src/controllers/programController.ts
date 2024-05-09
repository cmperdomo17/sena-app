import {Request, Response } from 'express';

import pool from '../database';

class ProgramController{
    public async ListPrograms (req: Request,res: Response){
        const sql=`CALL listPrograms()`;
        const programsList=await new Promise<any>((resolve, reject) => {
            pool.query(sql,
                (err: any, rows: any, fields: any) => {
                    if (err) reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(rows); // Si no, resolvemos con el resultado
                });
        });
        res.json(programsList[0]);
    }

    public async getProgram (req: Request,res: Response){
        const sql=`CALL getProgram(?)`;
        const programsList=await new Promise<any>((resolve, reject) => {
            pool.query(sql, [req.params.id],
                (err: any, rows: any, fields: any) => {
                    if (err) reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(rows); // Si no, resolvemos con el resultado
                });
        });
        res.json(programsList[0]);
    }

}

const programController = new ProgramController();
export default programController;