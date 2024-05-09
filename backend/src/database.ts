import mysql from 'mysql';
import keys from './keys';

const pool = mysql.createPool(keys.database);

pool.getConnection((err, connection)=>{
    if (err) throw err; 
    connection.release();
    console.log('DB is connected')
});

export default pool;