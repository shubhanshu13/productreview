const mongoose = require('mongoose')
require('dotenv').config()
const mongoURL = process.env.mongoDB_URL

mongoose.connect(mongoURL,{
    

})

//get default connection
const db = mongoose.connection;

//event listners
db.on('connected',()=>{

    console.log("connected to mongodb server");
});

db.on('error',(err)=>{

    console.log("mongodb connection error");
});

db.on('dissconnected',()=>{

    console.log("mongodb server dissconnected");
});

//export
module.exports = db;