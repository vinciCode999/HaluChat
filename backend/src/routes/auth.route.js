import express from 'express';
import { login, logout, signup, onBoard } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/onboarding', protectRoute, onBoard)


//checks if user is authenticated/logged in
authRouter.get('/me', protectRoute, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
})

export default authRouter;
