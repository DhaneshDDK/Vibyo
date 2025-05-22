require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: ['http://localhost:3000','*'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended : true}));

const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`Mail server is up and running on ${PORT}...`);
})

app.get('/',(req,res)=>{
    res.send("Welcome to Vibyo mail service")
})


const {sendEmail} = require('./Email')
app.post('/sendEmail', sendEmail)