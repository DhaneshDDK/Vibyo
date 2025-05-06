const { RunProducer } = require('../Kafka/Producers/Producer.js');

exports.Login = async (req,res)=>{
    try {
        const {email, password, location} = req.body;
        await RunProducer({email, password, location});
        res.status(200).json({ message: 'Login request sent successfully' });
    } catch (error) {
        console.error('Error during login request:', error);
        res.status(500).json({ error: 'Failed to send login request' });
    }
}