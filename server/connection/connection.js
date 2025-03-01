const mysql=require("mysql");


const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"zep_x"
});





module.exports=connection;