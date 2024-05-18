import {Request, Response } from 'express';

import pool from '../database';

class ScheduleController{
    public async ListAllSchedules (req: Request,res: Response){
        const sql=`CALL listSchedulesAll()`;
        const schedulesList=await new Promise<any>((resolve, reject) => {
            pool.query(sql,
                (err: any, rows: any, fields: any) => {
                    if (err) reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
        });
        res.json(schedulesList[0]);
    }

    public async ListSchedulesPeriodTeacher (req: Request,res: Response){
        const sql=`CALL listSchedulesPeriodTeacher(?, ?)`;
        const schedulesList=await new Promise<any>((resolve, reject) => {
            pool.query(sql, [req.params.Tid, req.params.Pid],
                (err: any, rows: any, fields: any) => {
                    if (err) reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
        });
        res.json(schedulesList[0]);
    }

    public async getSchedule (req: Request,res: Response){
        const sql=`CALL getSchedule(?)`;
        const schedule=await new Promise<any>((resolve, reject) => {
            pool.query(sql, [req.params.id],
                (err: any, rows: any, fields: any) => {
                    if (err) reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
        });
        res.json(schedule[0]);
    }

    public async create (req: Request,res: Response){
        console.log(req.body.ambient_id);
        const sql=`CALL createSchedule(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await pool.query(sql, [req.body.ambient_id,
                                req.body.teacher_id,
                                req.body.period_id,
                                req.body.competence_id,
                                req.body.competence_type,
                                req.body.schedule_day,
                                req.body.schedule_start_hour,
                                req.body.schedule_end_hour,
                                req.body.schedule_duration]);
        res.json({message: 'Schedule saved!'});
    }

    public async update (req: Request,res: Response){
        const sql=`CALL updateSchedule(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await pool.query(sql, [req.params.id,
                                req.body.ambient_id,
                                req.body.teacher_id,
                                req.body.period_id,
                                req.body.competence_id,
                                req.body.competence_type,
                                req.body.schedule_day,
                                req.body.schedule_start_hour,
                                req.body.schedule_end_hour,
                                req.body.schedule_duration]);
        res.json({message: 'Schedule updated!'});
    }

    public async delete (req: Request,res: Response){
        const sql=`CALL deleteSchedule(?)`;
        await pool.query(sql, [req.params.id]);
        res.json({message: 'Schedule deleted!'});
    }

}

const scheduleController = new ScheduleController();
export default scheduleController;