// userRoute.js

import express from 'express';
import { Login, Logout, Register, bookmarks, follow, getMyProfile, getOtherUsers, unfollow} from '../controllers/userController.js'
import isAuthenticated from '../config/auth.js';

const router = express.Router();

// Route to register a new user
router.post('/register', Register);
router.post('/login',Login)
router.get('/logout',Logout)
router.put('/bookmark/:id', isAuthenticated,bookmarks);
router.get('/profile/:id',getMyProfile);
router.get('/otheruser/:id',getOtherUsers);
router.post('/follow/:id',follow);
router.post('/unfollow/:id',unfollow);
export default router;
