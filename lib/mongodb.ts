import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState) {
    return; // Already connected
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MongoDB URI is missing');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

const closeDatabase = async () => {
  if (mongoose.connection.readyState) {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

export { connectToDatabase, closeDatabase };
