const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId: 'vibyo',
    brokers: ['192.168.0.111:9092'],
});

const createTopic = async (topicsList, partitions = 1, replicationFactor = 1) => {
    if (!Array.isArray(topicsList) || topicsList.length === 0) {
        console.error('Error: topicsList must be a non-empty array.');
        return;
    }
    console.log(topicsList)
    const admin = kafka.admin();
    console.log('Connecting to Kafka admin...');
    await admin.connect();
    console.log('Connected to Kafka admin.');
    try{
        console.log('Creating topics...');
        const topicsToCreate = topicsList.map(topic => ({
            topic: topic,
            numPartitions: partitions,
            replicationFactor: replicationFactor,
        }));
        console.log('Topics to be created:', topicsToCreate);
        await admin.createTopics({ topics: topicsToCreate });
        console.log('Topics created successfully.');
    }catch (error) {
        console.error('Error creating topics:', error);
    }finally{
        console.log('Disconnecting from Kafka admin...');
        await admin.disconnect();
        console.log('Disconnected from Kafka admin.');
    }
}


const deleteTopic = async (topicsList) => {
    const admin = kafka.admin();
    console.log('Connecting to Kafka admin...');
    await admin.connect();
    console.log('Connected to Kafka admin.');
    try{
        console.log('Deleting topics...');
        await admin.deleteTopics({
            topics: topicsList.map(topic => topic),
        })
        console.log('Topics deleted successfully.');
    }catch (error) {
        console.error('Error deleting topics:', error);
    }finally{
        console.log('Disconnecting from Kafka admin...');
        await admin.disconnect();
        console.log('Disconnected from Kafka admin.');
    }
}

module.exports = {kafka, createTopic, deleteTopic};