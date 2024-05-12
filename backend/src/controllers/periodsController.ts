import {Request, Response } from 'express';

import pool from '../database';

class PeriodsController{
    public async ListPeriods (req: Request,res: Response){
        const sql=`CALL listPeriods()`;
        const periodsList=await new Promise<any>((resolve, reject) => {
            pool.query(sql,
                (err: any, rows: any, fields: any) => {
                    if (err) reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
        });
        res.json(periodsList[0]);
    }

    public async getPeriod (req: Request,res: Response){
        const sql=`CALL getPeriod(?)`;
        const period=await new Promise<any>((resolve, reject) => {
            pool.query(sql, [req.params.id],
                (err: any, rows: any, fields: any) => {
                    if (err) reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
        });
        res.json(period[0]);
    }

    public async create (req: Request,res: Response){
        const sql=`CALL createPeriod(?, ?, ?)`;
        await pool.query(sql, [req.body.period_start_date, req.body.period_end_date, req.body.period_name]);
        res.json({message: 'Period saved!'});
    }

    public async update (req: Request,res: Response){
        const sql=`CALL updatePeriod(?, ?, ?, ?)`;
        await pool.query(sql, [req.params.id,req.body.period_start_date, req.body.period_end_date, req.body.period_name]);
        res.json({message: 'Period updated!'});
    }

    public async changeState (req: Request,res: Response){
        const sql=`CALL changeStatePeriod(?, ?)`;
        await pool.query(sql, [req.params.id,req.params.state]);
        res.json({message: 'Period state changed!'});
    }

}

const periodsController = new PeriodsController();
export default periodsController;