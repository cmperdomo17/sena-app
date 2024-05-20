import {Request, Response } from 'express';

import pool from '../database';

class UserTeacherController{
    public async getTeacher (req: Request,res: Response){
        const sql=`CALL getTeacherByUserId(?)`;
        const teacher=await new Promise<any>((resolve, reject) => {
            pool.query(sql, [req.body.user_id],
                (err: any, rows: any) => {
                    if (err) reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
        });
        res.json(teacher[0]);
    }

    public async ListSchedulesPeriodTeacher (req: Request,res: Response){
        const sql=`CALL listSchedulesPeriodTeacher(?, ?)`;
        const schedulesList=await new Promise<any>((resolve, reject) => {
            pool.query(sql, [req.body.teacher_id, req.params.Pid],
                (err: any, rows: any, fields: any) => {
                    if (err) reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
        });
        res.json(schedulesList[0]);
    }
}

const userTeacherController = new UserTeacherController();
export default userTeacherController;