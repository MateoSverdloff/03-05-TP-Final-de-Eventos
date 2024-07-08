import DBConfig from '../configs/dbConfig.js';
import pkg from 'pg'
const { Client, Pool }  = pkg;

export default class ProvinceRepository {
    getAllAsync = async (nombreTalba) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
await client.connect();
            const sql = `SELECT * FROM provinces`;
            const result = await client.query(sql);
await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    getByIdProvince = async (id) => {
        let returnEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM public.provinces where id = $1`;
            const values = [id];
            const result = await client.query(sql, values);
            await client.end();
            if (result.rows.length > 0){
                returnEntity = result.rows[0];
            }
            console.log('return: ', returnEntity)
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    getByIdAsync = async (id) => {
        let returnEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM public.provinces Where id = $1`;
            const values = [id];
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
                    const sql = `Insert Into provinces (name, full_name, latitude, longitude, display_order) Values ($1, $2, $3, $4, $5)`;
                    const values = [entity.name,entity.full_name,entity.latitude,entity.longitude,entity.display_order];
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
                    const sql = `update public.provinces SET name=$2, full_name=$3, latitude=$4, longitude=$5, display_order=$6 Where id=$1`;
                    const values = [entity.id,entity.name,entity.full_name,entity.latitude,entity.longitude,entity.display_order];  
                    const result = await client.query(sql, values);
        await client.end();
                    returnArray = result.rows;
                } catch (error) {
                    console.log(error);
                }
        return returnArray;
    }

    deleteByIdAsync = async (id) => {

        let returnArray = null;
        const client = new Client(DBConfig);
        try {
        await client.connect();
                    const sql = `DELETE FROM provinces Where id = $1`;
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
