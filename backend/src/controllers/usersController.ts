import pool from '../database';

class UsersController{
    public async ListUsers (){
        const sql=`CALL listUsers()`;
        const usersList=await new Promise<any>((resolve, reject) => {
            pool.query(sql,
                (err: any, rows: any) => {
                    if (err) reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
        });
        return usersList[0];
    }

    public async getUser (id: number){
        const sql=`CALL getUser(?)`;
        const user=await new Promise<any>((resolve, reject) => {
            pool.query(sql, [id],
                (err: any, rows: any) => {
                    if (err) reject(err); // En caso de error, resolvemos la Promise con error
                    resolve(Object.values(JSON.parse(JSON.stringify(rows)))); // Si no, resolvemos con el resultado
                });
        });
        return user[0];
    }

    public async create (user_login: string, user_pwd: string){
        const sql=`CALL createUser(?, ?)`;
        await pool.query(sql, [user_login,user_pwd]);
    }

    public async update (user_id:number, user_login: string, user_pwd: string){
        const sql=`CALL updateUser(?, ?, ?)`;
        await pool.query(sql, [user_id,user_login,user_pwd]);
    }

    public async changeState (id:number, state: number){
        const sql=`CALL changeStateUser(?, ?)`;
        await pool.query(sql, [id,state]);
    }

}

const usersController = new UsersController();
export default usersController;