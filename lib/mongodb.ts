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

const handleMongooseError = (error: unknown, context: string): never => {
  if (error instanceof mongoose.Error.ValidationError) {
    throw new Error(`${context}: Validation error`);
  }
  if (error instanceof mongoose.Error.CastError) {
    throw new Error(`${context}: Cast error`);
  }
  if (error instanceof mongoose.Error) {
    throw new Error(`${context}: Mongoose error`);
  }
  throw new Error(`${context}: ${error}`);
};

export { connectToDatabase, closeDatabase, handleMongooseError };
