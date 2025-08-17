import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMyFriends, getRecommendedUsers, sendFriendRequest } from '../controllers/user.controller.js';

const userRouter = express.Router();

//apply auth middleware to all routes
userRouter.use(protectRoute);

userRouter.get('/',  getRecommendedUsers);
userRouter.get('/friends', getMyFriends);
userRouter.post('/friend-request/:id', sendFriendRequest);

export default userRouter;