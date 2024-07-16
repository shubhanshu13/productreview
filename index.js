const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const db = require('./db')
require('dotenv').config()
const fs = require('fs')

const product = require('./routes/product')
app.use('/product',product)

app.listen(8000,()=>{
    console.log("server listing on port 8000")
})