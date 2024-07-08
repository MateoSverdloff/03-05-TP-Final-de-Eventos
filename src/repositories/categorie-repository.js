import DBConfig from '../configs/dbConfig.js';
import pkg from 'pg'
const { Client, Pool }  = pkg;

export default class EventRepository {
    getAllAsync = async (nombreTalba) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
await client.connect();
            const sql = `SELECT * FROM event_categories`;
            const result = await client.query(sql);
await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    getByIdAsync = async (id) => {
        let returnEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM event_categories Where id = $1`;
            const values = [id];  // [2, 'mate´´]
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

    createAsync = async (entity) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {   
        await client.connect();
                    const sql = `Insert Into event_categories (name, display_order) Values ($1, $2)`;
                    const values = [entity.name,entity.display_order];
                    const result = await client.query(sql, values);
        await client.end();
                    returnArray = result.rows;
                } catch (error) {
                    console.log(error);
                }
        return returnArray;
    }

    updateAsync = async (entity) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
        await client.connect();
        //ERROR CERCA DE PUT
                    const sql = `update public.event_categories SET name = $2, display_order = $3 WHERE id = $1 `;
                    const values = [entity.id, entity.name, entity.display_order];  
                    const result = await client.query(sql, values);
        await client.end();
                    returnArray = result.rows;
                } catch (error) {
                    console.log(error);
                }
        return returnArray;
    }
    deleteByIdAsync = async (id) => {
        console.log('id: ',id)
        //ERROR NO PUEDE HACER DELETE
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
        await client.connect();
                    const sql = `DELETE FROM event_categories Where id = $1`;
                    const values = [id];
                    
                    const result = await client.query(sql, values);
        await client.end();
                    returnArray = result.rows;
                } catch (error) {
                    console.log(error);
                }
        return returnArray;
}

}
