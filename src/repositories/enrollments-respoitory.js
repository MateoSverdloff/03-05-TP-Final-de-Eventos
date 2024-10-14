import DBConfig from '../configs/dbConfig.js';
import pkg from 'pg'
const { Client, Pool }  = pkg;

export default class EventRepository {

    getByEventId = async (id_evento, first_name, last_name, username, attended, rating) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        let values = [];
    
        try {
            await client.connect();
            let query = `
            SELECT 
                ee.id_event, 
                u.first_name, 
                u.last_name, 
                u.username, 
                ee.attended, 
                ee.rating 
            FROM 
                users AS u 
            INNER JOIN 
                event_enrollments AS ee 
            ON 
                ee.id_user = u.id
            WHERE 
                ee.id_event = $1`;
    
            const params = [];
            let cont = 1;
            values.push(id_evento);
    
            if (first_name) {
                params.push(`lower(u.first_name) = lower($${++cont})`);
                values.push(first_name);
            }
            if (last_name) {
                params.push(`lower(u.last_name) = lower($${++cont})`);
                values.push(last_name);
            }
            if (username) {
                params.push(`lower(u.username) = lower($${++cont})`);
                values.push(username);
            }
            if (attended !== undefined) {
                params.push(`ee.attended = $${++cont}`);
                values.push(attended);
            }
            if (rating !== undefined) {
                params.push(`ee.rating = $${++cont}`);
                values.push(rating);
            }
    
            if (params.length > 0) {
                query += ' AND ' + params.join(' AND ');
            }
    
            const result = await client.query(query, values);
            returnArray = result.rows;
        } catch (error) {
            console.error(error);
        } finally {
            await client.end();
        }
    
        return returnArray;
    }
    
    

    createAsync = async (id_user, id_evento) => {
        let rowCount = 0;
        const client = new Client(DBConfig);
        try {
            console.log('id:evento', id_evento);
            await client.connect();
            console.log('Conexión establecida');
            
            const sql = `INSERT INTO public.event_enrollments (id_event, id_user) VALUES ($1, $2)`; 
            const values = [id_evento, id_user]; 
            const result = await client.query(sql, values);
            
            rowCount = result.rowCount;
            return { success: true, rowCount }; // Devolver un objeto JSON
        } catch (error) {
            console.log(error);
            return { success: false, error: error.message }; // Manejo de errores
        } finally {
            await client.end();
        }
    }
    
    
    deleteByIdAsync = async (id_user) => {
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `DELETE FROM public.event_enrollments WHERE id_user = $1`;
            const values = [id_user];
            const result = await client.query(sql, values);
            return result.rowCount; 
        } catch (error) {
            console.error(error);
            throw error; 
        } finally {
            await client.end();
        }
    };
    

patchByIdAsync = async (id_event, rating) => {
    console.log('id: ',id_event, rating)
    let rowCount = 0;
    const client = new Client(DBConfig);
    try {
    await client.connect();
                const sql = `UPDATE event_enrollments set rating = $2 Where id_event = $1`;
                const values = [id_event, rating];
                const result = await client.query(sql, values);
                rowCount++;
    await client.end();
    rowCount = result.rows;
            } catch (error) {
                console.log(error);
            }
    return rowCount;
}

}