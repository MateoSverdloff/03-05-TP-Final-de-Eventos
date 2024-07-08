import config from './dbconfig.js'
import pkg from 'pg'

const {Client}  = pkg;

    // https://node-postgres.com/apis/client
    const client = new Client(config);
    await client.connect();
    
    let sql = `SELECT * from event_categories`; // "... limit 5
    let result = await client.query(sql);
    
    await client.end();
    
    // "rows' es un array. rows[0] el 1%er registro.
    console.log(result.rows);
