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

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Kafka server is up and running on ${PORT}...`);
})

app.get('/',(req,res)=>{
    res.send("Welcome to Kafka service")
})

const TopicRouter = require('./Routes/Topics.js');
app.use('/api/topics', TopicRouter);