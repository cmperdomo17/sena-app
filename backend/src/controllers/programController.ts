import {Request, Response } from 'express';

import pool from '../database';

class ProgramController{
    public async ListPrograms (req: Request,res: Response){
        const sql=`CALL listPrograms()`;
        const programsList=await new Promise<any>((resolve, reject) => {
            pool.query(sql,
                (err: any, rows: any, fields: any) => {
                    if (err) reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
        });
        res.json(programsList[0]);
    }

    public async getProgram (req: Request,res: Response){
        const sql=`CALL getProgram(?)`;
        const program=await new Promise<any>((resolve, reject) => {
            pool.query(sql, [req.params.id],
                (err: any, rows: any, fields: any) => {
                    if (err) reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
        });
        res.json(program[0]);
    }

    public async create (req: Request,res: Response){
        const sql=`CALL createProgram(?)`;
        await pool.query(sql, [req.body.program_name]);
        res.json({message: 'Program saved!'});
    }

    public async update (req: Request,res: Response){
        const sql=`CALL updateProgram(?, ?)`;
        await pool.query(sql, [req.params.id,req.body.program_name]);
        res.json({message: 'Program updated!'});
    }

    public async changeState (req: Request,res: Response){
        const sql=`CALL changeStateProgram(?, ?)`;
        await pool.query(sql, [req.params.id,req.params.state]);
        res.json({message: 'Program state changed!'});
    }

}

const programController = new ProgramController();
export default programController;