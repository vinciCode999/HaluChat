import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { 
  getMyFriends, 
  getRecommendedUsers, 
  sendFriendRequest, 
  acceptFriendRequest, 
  getFriendRequests,
  getOutgoingFriendRequests
} from '../controllers/user.controller.js';

const userRouter = express.Router();

//apply auth middleware to all routes
userRouter.use(protectRoute);

userRouter.get('/',  getRecommendedUsers);
userRouter.get('/friends', getMyFriends);
userRouter.post('/friend-request/:id', sendFriendRequest);
userRouter.put('/friend-request/:id/accept', acceptFriendRequest);
userRouter.get('/friend-requests', getFriendRequests);
userRouter.get('/outgoing-friend-requests', getOutgoingFriendRequests);


export default userRouter;