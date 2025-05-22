const express = require('express');
const router = express.Router();
const { createTopic, deleteTopic } = require('../KafkaConfig');

router.post('/create', (req,res)=>{
    try {
        const { topicsList, partitions, replicationFactor } = req.body;
        console.log('Received request to create topics:', topicsList);
        createTopic(topicsList, partitions, replicationFactor)
        .then(() => {
            res.status(200).json({ message: 'Topics created successfully' });
        });
    } catch (error) {
        console.error('Error during request processing:', error);
        res.status(500).json({ error: 'Failed to create topics' });
    }
});
router.post('/delete', (req,res)=>{
    const { topicsList } = req.body;
    console.log('Received request to delete topics:', topicsList);
    deleteTopic(topicsList)
        .then(() => {
            res.status(200).json({ message: 'Topics deleted successfully' });
        })
        .catch((error) => {
            console.error('Error deleting topics:', error);
            res.status(500).json({ message: 'Failed to delete topics', error : error.message });
        }); 
});

module.exports = router;