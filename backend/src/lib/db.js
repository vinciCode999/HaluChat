import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log("MONGODB connected: ", conn.connection.host);
  } catch (error) {
    console.log("Database connection error: ", error);
    process.exit(1);
  }
}

export default connectDB;
