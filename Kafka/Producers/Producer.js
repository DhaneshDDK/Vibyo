const {kafka} = require('../KafkaConfig.js');
const producer = kafka.producer();
const {USER_LOGIN} = require('../../Constants.js');

const RunProducer = async (message)=>{
    await producer.connect();
        console.log('Connected to Kafka producer.');
        const data = {
            topic: USER_LOGIN,
            partition : message?.location.toLowerCase() === "india" ? 0 : 1,
            messages: [
                { value: JSON.stringify(message) },
            ]
        };
        console.log('Sending message to Kafka topic:', data);
        await producer.send(data);
        console.log('Message sent successfully.');
}

module.exports = {RunProducer};