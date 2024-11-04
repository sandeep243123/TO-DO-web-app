const mongoose = require('mongoose');
require('dotenv').config();
const URL = process.env.DATABASE_URL;
const dbConnect = ()=>{
    mongoose.connect(URL)
    .then(()=>{
        console.log("DataBase Connection Successfull");
    })
    .catch((err)=>{
        console.log("Connection Failed");
        console.log(err);
        process.exit(1);
    })
}

module.exports = dbConnect;