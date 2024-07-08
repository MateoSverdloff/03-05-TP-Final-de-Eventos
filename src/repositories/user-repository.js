import DBConfig from '../configs/dbConfig.js';
import pkg from 'pg'
const { Client, Pool }  = pkg;

export default class EventRepository {
    getAllAsync = async (nombreTalba) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
await client.connect();
            const sql = `SELECT * FROM users`;
            const result = await client.query(sql);
await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    getByIdAsync = async (Id) => {
        let returnEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM public.users where Id=$1`;
            const values = [Id];  // [2, 'mate´´]
            const result = await client.query(sql, values);
            await client.end(); 
            if (result.rows.length > 0){
                returnEntity = result.rows[0];
            }
            
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
//validar que el usuario este bien puesto, luego hacer valer el token diablos
    createAsync = async (entity) => {
        let rowCount = null;
        const client = new Client(DBConfig);


        try {
                await client.connect();
                            const sql = `Insert Into users (first_name, last_name, username, password) Values ($1, $2, $3, $4)`;
                            const values = [entity.first_name,entity.last_name,entity.username,entity.password];  // [2, 'mate´´]
                            const result = await client.query(sql, values);
                await client.end();
                    rowCount = result.rowCount;
                } catch (error) {
                    console.log(error);
                }
        return rowCount;
    }

    updateAsync = async (entity) => {
        let rowCount = 0;
        const client = new Client(DBConfig);
        try {
            console.log(entity)
        await client.connect();
                    const sql = `update public.users SET first_name=$2, last_name=$3, username=$4, password=$5 WHERE id = $1 `;
                    const values = [entity.id,entity.first_name,entity.last_name,entity.username,entity.password];  
                    const result = await client.query(sql, values);
        await client.end();
            rowCount = result.rowCount;
                } catch (error) {
                    console.log(error);
                }
        return rowCount;
    }
    deleteByIdAsync = async (id) => {
        console.log('id: ',id)
        //ERROR NO PUEDE HACER DELETE
        let rowCount = null;
        const client = new Client(DBConfig);
        try {
        await client.connect();
                    const sql = `DELETE FROM users Where id = $1`;
                    const values = [id];
                    
                    const result = await client.query(sql, values);
        await client.end();
            rowCount = result.rowCount;
                } catch (error) {
                    console.log(error);
                }
        return rowCount;
    }

    getByUserNameAndPassword = async (entity) => {
        let returnEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM public.users 
                        WHERE username = $1
                        AND password = $2`;
            const values = [entity.username, entity.password];
            const result = await client.query(sql, values);
            //console.log("el sql usuario: ", result)
            await client.end(); 
            if (result.rows.length > 0){
                returnEntity = result.rows[0];
            }
            console.log("getByUserNameAndPassword". returnEntity)
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    


}
