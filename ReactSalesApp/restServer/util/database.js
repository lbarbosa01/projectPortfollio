const mysql = require("mysql2");

const pool = mysql.createPool( {
    host: '45.55.136.114',
    user : 'F2023_lbarbosa01',
    database : 'F2023_lbarbosa01',
    password : 'BilledHeron02'
});

module.exports = pool.promise();