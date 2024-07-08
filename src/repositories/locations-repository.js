import DBConfig from '../configs/dbConfig.js';
import pkg from 'pg'
const { Client, Pool }  = pkg;

export default class LocationsRepository {
    getAllAsync = async (nombreTalba) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
await client.connect();
            const sql = `SELECT * FROM event_locations`;
            const result = await client.query(sql);
await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    getByIdLocation = async (id) => {
        let returnEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM public.event_locations where id_location = $1`;
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
            const sql = `SELECT * FROM public.event_locations Where id = $1`;
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

//id_location, name, full_adress, max_capacity, latitude, longitude, id_creator_user

    createAsync = async (entity, id_user) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {   
        await client.connect();
        const sql = `
        INSERT INTO public.event_locations (
            id_location,
            name,
            full_address,
            max_capacity,
            latitude,
            longitude,
            id_creator_user
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
        const values = [entity.id_location, entity.name, entity.full_adress, entity.max_capacity, entity.latitude, entity.longitude, id_user];
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
            const sql = `
                UPDATE public.event_locations
                SET 
                    id_location = $2,    
                    name = $3,         
                    full_address = $4,  
                    max_capacity = $5,  
                    latitude = $6,  
                    longitude = $7,    
                    id_creator_user = $8 
                WHERE id = $1    
            `;             
            const values = [
                entity.id,              
                entity.id_location,    
                entity.name,       
                entity.full_address,    
                entity.max_capacity, 
                entity.latitude,        
                entity.longitude,        
                entity.id_creator_user  
            ];
            const result = await client.query(sql, values);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log('Error actualizando la ubicación:', error);
        }
        return returnArray;
    }
    
    
    deleteByIdAsync = async (id) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        try {
        await client.connect();
                    const sql = `DELETE FROM public.event_locations Where id = $1`;
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
