const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rh_node_js'  
});

pool.query = util.promisify(pool.query); 
module.exports = pool