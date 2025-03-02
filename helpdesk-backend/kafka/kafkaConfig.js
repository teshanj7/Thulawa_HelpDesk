const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'helpdesk-backend',
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const connectProducer = async () => {
  try {
    await producer.connect();
    console.log('Producer connected to Kafka successfully');
  } catch (error) {
    console.error('Failed to connect producer to Kafka:', error);
    throw error;
  }
};

module.exports = {
  producer,
  connectProducer,
};