import { config } from 'dotenv';
import mongoose from 'mongoose';


config();

mongoose.set('strictQuery', false);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB.');
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export default connectToDatabase;