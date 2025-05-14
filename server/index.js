require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./Configurations/MongoDB.js');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); 
    }
};

startServer();


app.get('/',(req,res)=>{
    console.log('Received request to root endpoint');
    res.send('Welcome to the VIBYO API!');
})

const TopicRouter = require('./Routes/Topics.js');
app.use('/api/topics', TopicRouter);

const AuthRouter = require('./Routes/Auth.js');
app.use('/api/auth', AuthRouter);