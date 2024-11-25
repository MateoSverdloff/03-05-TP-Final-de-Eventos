import DBConfig from '../configs/dbConfig.js';
import pkg from 'pg'
const { Client, Pool }  = pkg;

export default class EventRepository {
    getAllAsync = async (name, tag, description, category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) => {
        let returnArray = null;
        const client = new Client(DBConfig);
        let posicion = 1;
        const values = [];
        try {
            await client.connect();
            let sql = `
            SELECT DISTINCT ON (e.id)
                e.id, 
                e.name, 
                e.description, 
                e.id_event_category, 
                e.id_event_location, 
                e.start_date, 
                e.duration_in_minutes, 
                e.price, 
                e.enabled_for_enrollment, 
                e.max_assistance, 
                e.id_creator_user,
                json_build_object(
                    'id', el.id, 
                    'id_location', el.id_location, 
                    'name', el.name, 
                    'full_address', el.full_address, 
                    'max_capacity', el.max_capacity, 
                    'latitude', el.latitude, 
                    'longitude', el.longitude, 
                    'id_creator_user', el.id_creator_user, 
                    'location', json_build_object(
                        'id', l.id, 
                        'name', l.name, 
                        'id_province', l.id_province, 
                        'latitude', l.latitude, 
                        'longitude', l.longitude, 
                        'province', json_build_object(
                            'id', p.id, 
                            'name', p.name, 
                            'full_name', p.full_name, 
                            'latitude', p.latitude, 
                            'longitude', p.longitude, 
                            'display_order', p.display_order
                        )
                    )
                ) as event_location,
                COALESCE(
                    (
                        SELECT array_to_json(array_agg(json_build_object('id', t2.id, 'name', t2.name)))
                        FROM tags t2
                        INNER JOIN event_tags et2 ON et2.id_tag = t2.id
                        WHERE et2.id_event = e.id
                    ),
                    '[]'
                ) as tags,
                json_build_object(
                    'id', ec.id, 
                    'name', ec.name, 
                    'display_order', ec.display_order
                ) as event_category
            FROM events e
            LEFT JOIN event_locations el ON el.id = e.id_event_location 
            LEFT JOIN locations l ON l.id = el.id_location 
            LEFT JOIN provinces p ON p.id = l.id_province 
            LEFT JOIN event_categories ec ON ec.id = e.id_event_category
            WHERE 1=1`;

            if (tag && tag.length > 0) {
                sql += ` AND e.id IN (
                    SELECT et.id_event 
                    FROM event_tags et 
                    JOIN tags t ON t.id = et.id_tag 
                    WHERE LOWER(t.name) ILIKE LOWER($${posicion}))`;
                posicion++;
                values.push(`%${tag}%`);
            }

            if (category && category.length > 0) {
                sql += ` AND e.id IN (
                    SELECT e2.id 
                    FROM events e2 
                    JOIN event_categories ec2 ON ec2.id = e2.id_event_category 
                    WHERE LOWER(ec2.name) ILIKE LOWER($${posicion}))`;
                posicion++;
                values.push(`%${category}%`);
            }

            if (name) {
                sql += ` AND LOWER(e.name) ILIKE LOWER($${posicion})`;
                values.push(`%${name}%`);
                posicion++;
            }

            if (description) {
                sql += ` AND LOWER(e.description) ILIKE LOWER($${posicion})`;
                values.push(`%${description}%`);
                posicion++;
            }

            if (id_event_location) {
                sql += ` AND e.id_event_location = $${posicion}`;
                values.push(id_event_location);
                posicion++;
            }

            if (duration_in_minutes) {
                sql += ` AND e.duration_in_minutes = $${posicion}`;
                values.push(duration_in_minutes);
                posicion++;
            }

            if (price) {
                sql += ` AND e.price = $${posicion}`;
                values.push(price);
                posicion++;
            }

            if (enabled_for_enrollment) {
                sql += ` AND e.enabled_for_enrollment = $${posicion}`;
                values.push(enabled_for_enrollment);
                posicion++;
            }

            if (max_assistance) {
                sql += ` AND e.max_assistance = $${posicion}`;
                values.push(max_assistance);
                posicion++;
            }

            if (id_creator_user) {
                sql += ` AND e.id_creator_user = $${posicion}`;
                values.push(id_creator_user);
                posicion++;
            }

            sql += ` ORDER BY e.id`;

            const result = await client.query(sql, values);
            returnArray = result.rows;
        } catch (error) {
            console.error('Error en getAllAsync:', error);
            throw error;
        } finally {
            await client.end();
        }

        return returnArray;
    }
    

    async getTag (tag){
        let returnEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM public.events
            LEFT JOIN public.event_tags ON events.id = event_tags.id_event
            LEFT JOIN public.tags ON event_tags.id_tag = tags.id
            WHERE lower(tags.name)=$1`;
            const values = [tag];
            const result = await client.query(sql, values);
            return result.rows;
        } catch (error) {
            console.log(error);
        }
    }

    async getCategory (category){
        let returnEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM public.events
            LEFT JOIN public.event_categories ON event_categories.id = events.id_event_category
            WHERE lower(event_categories.name)=$1;`;
            const values = [category];
            const result = await client.query(sql, values);
            return result.rows;
        } catch (error) {
            console.log(error);
        }
    }

    async getEventDetails(id) {
        let returnEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const numericId = parseInt(id, 10);
            
            if (isNaN(numericId)) {
                throw new Error('ID inválido');
            }

            const sql = `
                SELECT 
                    e.id as event_id, 
                    e.name, 
                    e.description, 
                    e.id_event_category, 
                    e.id_event_location, 
                    e.start_date, 
                    e.duration_in_minutes, 
                    e.price, 
                    e.enabled_for_enrollment, 
                    e.max_assistance, 
                    e.id_creator_user, 
                    json_build_object(
                        'id', el.id, 
                        'id_location', el.id_location, 
                        'name', el.name, 
                        'full_address', el.full_address, 
                        'max_capacity', el.max_capacity, 
                        'latitude', el.latitude, 
                        'longitude', el.longitude, 
                        'id_creator_user', el.id_creator_user, 
                        'location', json_build_object(
                            'id', l.id, 
                            'name', l.name, 
                            'id_province', l.id_province, 
                            'latitude', l.latitude, 
                            'longitude', l.longitude, 
                            'province', json_build_object(
                                'id', p.id, 
                                'name', p.name, 
                                'full_name', p.full_name, 
                                'latitude', p.latitude, 
                                'longitude', p.longitude, 
                                'display_order', p.display_order
                            )
                        ), 
                        'creator_user', (
                            SELECT json_build_object(
                                'id', users.id, 
                                'first_name', users.first_name, 
                                'last_name', users.last_name, 
                                'username', users.username, 
                                'password', users.password
                            ) 
                            FROM users 
                            WHERE users.id = el.id_creator_user
                        )
                    ) as event_location, 
                    array(
                        SELECT json_build_object('id', t.id, 'name', t.name) 
                        FROM tags as t 
                        INNER JOIN event_tags as et on et.id_event = e.id and et.id_tag = t.id
                    ) as tags, 
                    (
                        SELECT json_build_object(
                            'id', users.id, 
                            'first_name', users.first_name, 
                            'last_name', users.last_name, 
                            'username', users.username, 
                            'password', users.password
                        ) as creator_user 
                        FROM users 
                        WHERE users.id = e.id_creator_user
                    ), 
                    json_build_object('id', ec.id, 'name', ec.name, 'display_order', ec.display_order) as event_category 
                FROM 
                    events as e 
                    INNER JOIN event_locations as el on el.id = e.id_event_location 
                    INNER JOIN locations as l on l.id = el.id_location 
                    INNER JOIN provinces as p on p.id = l.id_province 
                    INNER JOIN event_categories as ec on ec.id = e.id_event_category
                    LEFT JOIN event_tags ON e.id = event_tags.id_event
                    LEFT JOIN tags ON event_tags.id_tag = tags.id 
                WHERE 
                    e.id = $1`;
        
            const values = [numericId];
            const result = await client.query(sql, values);
        
            if (result.rows.length > 0) {
                returnEntity = result.rows[0];
            }   
        
        } catch (error) {
            console.error('Error en la consulta:', error);
            throw error;
        } finally {
            await client.end();
        }
        
        return returnEntity;
    }

    async getEventCategory(id) {
        let returnEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `
                SELECT 
                    e.id as event_id, 
                    e.name, 
                    e.description, 
                    e.id_event_category, 
                    e.id_event_location, 
                    e.start_date, 
                    e.duration_in_minutes, 
                    e.price, 
                    e.enabled_for_enrollment, 
                    e.max_assistance, 
                    e.id_creator_user, 
                    json_build_object(
                        'id', el.id, 
                        'id_location', el.id_location, 
                        'name', el.name, 
                        'full_address', el.full_address, 
                        'max_capacity', el.max_capacity, 
                        'latitude', el.latitude, 
                        'longitude', el.longitude, 
                        'id_creator_user', el.id_creator_user, 
                        'location', json_build_object(
                            'id', l.id, 
                            'name', l.name, 
                            'id_province', l.id_province, 
                            'latitude', l.latitude, 
                            'longitude', l.longitude, 
                            'province', json_build_object(
                                'id', p.id, 
                                'name', p.name, 
                                'full_name', p.full_name, 
                                'latitude', p.latitude, 
                                'longitude', p.longitude, 
                                'display_order', p.display_order
                            )
                        ), 
                        'creator_user', (
                            SELECT json_build_object(
                                'id', users.id, 
                                'first_name', users.first_name, 
                                'last_name', users.last_name, 
                                'username', users.username, 
                                'password', users.password
                            ) 
                            FROM users 
                            WHERE users.id = el.id_creator_user
                        )
                    ) as event_location, 
                    array(
                        SELECT json_build_object('id', t.id, 'name', t.name) 
                        FROM tags as t 
                        INNER JOIN event_tags as et on et.id_event = e.id and et.id_tag = t.id
                    ) as tags, 
                    (
                        SELECT json_build_object(
                            'id', users.id, 
                            'first_name', users.first_name, 
                            'last_name', users.last_name, 
                            'username', users.username, 
                            'password', users.password
                        ) as creator_user 
                        FROM users 
                        WHERE users.id = e.id_creator_user
                    ), 
                    json_build_object('id', ec.id, 'name', ec.name, 'display_order', ec.display_order) as event_category 
                FROM 
                    events as e 
                    INNER JOIN event_locations as el on el.id = e.id_event_location 
                    INNER JOIN locations as l on l.id = el.id_location 
                    INNER JOIN provinces as p on p.id = l.id_province 
                    INNER JOIN event_categories as ec on ec.id = e.id_event_category
                    LEFT JOIN event_tags ON e.id = event_tags.id_event
                    LEFT JOIN tags ON event_tags.id_tag = tags.id 
                WHERE 
                    ec.id = $1`;
        
            const values = [id];
            const result = await client.query(sql, values);
        
            if (result.rows.length > 0) {
                returnEntity = result.rows[0];
            }   
        
        } catch (error) {
            console.error('Error en la consulta:', error);
        } finally {
            await client.end();
        }
        
        return returnEntity;
    }
    
       
    getByIdAsync = async (id) => {
        let returnEntity = null;
        const client = new Client(DBConfig);
        try {
            await client.connect();
            const sql = `SELECT * FROM events Where id = $1`;
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


// id, name description, id_event_category, id_event_location
// start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user

createAsync = async (entity, id_user) => {
    let returnArray = null;
    const client = new Client(DBConfig);
    try {   
    await client.connect();
    let sql =
    'INSERT INTO public.events(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);';
    const values = [
        entity.name,
        entity.description,
        entity.id_event_category,
        entity.id_event_location,
        entity.start_date,
        entity.duration_in_minutes,
        entity.price,
        entity.enabled_for_enrollment,
        entity.max_assistance,
        id_user,
    ];
                const result = await client.query(sql, values);
    await client.end();
                returnArray = result.rows;
            } catch (error) {
                console.log(error);
            }
    return returnArray;
}

update2Async = async (entity) => {
    let returnArray = null;
    const client = new Client(DBConfig);
    try {
    await client.connect();
    const sql = `
    UPDATE public.events 
    SET 
        name = $2, 
        description = $3, 
        id_event_category = $4, 
        id_event_location = $5, 
        start_date = $6, 
        duration_in_minutes = $7, 
        price = $8, 
        enabled_for_enrollment = $9, 
        max_assistance = $10, 
        id_creator_user = $11 
    WHERE id = $1
`;                const values = [entity.id, entity.name, entity.description, entity.id_event_category, entity.id_event_location, entity.start_date, entity.duration_in_minutes, entity.price, entity.enabled_for_enrollment, entity.max_assistance, entity.id_creator_user];  
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
                const sql = `DELETE FROM events Where id = $1`;
                const values = [id];
                const result = await client.query(sql, values);
    await client.end();
                returnArray = result.rows;
            } catch (error) {
                console.log(error);
            }
    return returnArray;
}

//ejemplo aca cuando busco un evento que no existe que me de la informacion de que no existe

}