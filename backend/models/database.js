const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE,
    connectionLimit: 5,
});

function removeMeta(response) {
    delete response.meta;
    return response;
}
async function getOne(sql, data = []) {
    const result =  await query(sql, data);
    return result[0];
}

async function query(sql, data = []) {
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query(sql, data);
        return removeMeta(response);
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
    }
}

module.exports.getOne = getOne;
module.exports.query = query;