const {kafka} = require('../Kafka/KafkaConfig.js');
const producer = kafka.producer();
const {USER_LOGIN} = require('../Constants.js');

exports.Login = async (req,res)=>{
    try {
        const {email, password, location} = req.body;
        await producer.connect();
        console.log('Connected to Kafka producer.');
        const data = {
            topic: USER_LOGIN,
            partition : location.toLowerCase() === "india" ? 0 : 1,
            messages: [
                {
                value: JSON.stringify({
                    email: email,
                    password: password,
                    location: location,
                }),
                },
            ],
        };
        console.log('Sending message to Kafka topic:', data);
        await producer.send(data);
        console.log('Message sent successfully.');
        res.status(200).json({ message: 'Login request sent successfully' });
    } catch (error) {
        console.error('Error during login request:', error);
        res.status(500).json({ error: 'Failed to send login request' });
    }
}