require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const { createTopic, deleteTopic } = require('./Kafka/KafkaConfig.js');

app.use(cors({origin : '*'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/',(req,res)=>{
    console.log('Received request to root endpoint');
    res.send('Welcome to the VIBYO API!');
})

const TopicRouter = require('./Routes/Topics.js');
app.use('/api/topics', TopicRouter);

const AuthRouter = require('./Routes/Auth.js');
app.use('/api/auth', AuthRouter);