const {kafka} = require('../KafkaConfig');
const {USER_LOGIN} = require('../../Constants.js');

const consumer = kafka.consumer({ groupId: 'user-login-group' });

const RunLoginConsumer = async ()=>{
    console.log('Connecting to Kafka consumer...');
    await consumer.connect();
    console.log('Connected to Kafka consumer.');
    await consumer.subscribe({ topic: USER_LOGIN, fromBeginning: true });
    console.log('Subscribed to Kafka topic:', USER_LOGIN);
    await consumer.run({
        eachMessage: async ({topic,partition,message})=>{
           console.log('Received message:', {
                topic,
                partition,
                value: message.value.toString(),
            });
            
        }
    })

}

RunLoginConsumer().catch(console.error);    