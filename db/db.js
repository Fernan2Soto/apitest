const mysql = require('mysql');
const connection = mysql.createConnection({
    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env_DB_DATABASE
    host:'34.125.185.61',
    user:'root',
    password:'fernando1234',
    database:'yapu'
});

connection.connect((error)=>{
    if(error){
        console.log('el error de coneccion es: ' +error);
        return;
    }
    console.log('conectado a la base de datos');
});
module.exports = connection;