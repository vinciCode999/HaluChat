import {StreamChat} from 'stream-chat';
import 'dotenv/config';

const STREAM_API_KEY = process.env.STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET;

if (!STREAM_API_KEY || !STREAM_API_SECRET) {
  throw new Error("Missing Stream API credentials");
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

//Todo: do it later
export const generateStreamToken = (userId) => {
}
