var util = require('util');
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'mysql',
    
});

pool.getConnection((err, connect) =>{
    if(err){
        console.err("error while connecting database")
    } else{
        connect.release();
    }
    return
});

pool.query = util.promisify(pool.query);

module.exports = pool;
