const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes =require('./routes/userRoute')
require("dotenv").config();


const PORT = process.env.PORT || 3000;
 
require('./db')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




// app.get('/', (req,res)=>{
//     res.send("WELCOME")
// })

app.use('/api/user', routes)

app.listen (PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})