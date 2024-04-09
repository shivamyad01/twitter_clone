// userRoute.js

import express from 'express';
import { createTweet, deleteTweet, getAllTweets, getFollowingTweets, likeOrDislike } from '../controllers/tweetController.js';
import isAuthenticated from '../config/auth.js'; // Corrected import path for isAuthenticated middleware

const router = express.Router();

router.post('/create', createTweet);
router.delete('/delete/:id', isAuthenticated , deleteTweet);
router.put('/like/:id',likeOrDislike);
router.get('/getalltweet/:id',getAllTweets);
router.get('/getfollowingtweet/:id', isAuthenticated,getFollowingTweets);



export default router;
