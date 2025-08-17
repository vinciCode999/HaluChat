import {StreamChat} from 'stream-chat';
import 'dotenv/config';

const STREAM_API_KEY = process.env.STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET;

if (!STREAM_API_KEY || !STREAM_API_SECRET) {
  console.error("Missing Stream API credentials");
}

const streamClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);

export const upsertStreamUser = async(userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
}

export const generateStreamToken = (userId) => {
  try {
    //Ensure user id is string
    const userIdString = userId.toString();
    return streamClient.createToken(userIdString);
  } catch (error) {
    console.error("Error generating Stream token:", error.message);
  }
}
