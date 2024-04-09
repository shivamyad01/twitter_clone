// Import the Tweet model
import { Tweet } from "../models/tweetSchema.js";

// Your createTweet function
export const createTweet = async (req, res) => {
    try {
        const { description, id } = req.body;
        if (!description || !id) {
            return res.status(400).json({
                message: "Fields are required",
                success: false
            });
        }
        const user=await User.findById(id).select("-password ")
        await Tweet.create({
            description,
            userId: id,
            userDetails:user
        });
        return res.status(201).json({
            message: "Tweet created successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const deleteTweet = async (req, res) => {
    try {
        const { id } = req.params;
        await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Tweet deleted successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export const likeOrDislike = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            return res.status(404).json({
                message: "Tweet not found",
                success: false
            });
        }
        if (tweet.like.includes(loggedInUserId)) {
            // Dislike
            await Tweet.findByIdAndUpdate(tweetId, { $pull: { like: loggedInUserId } });
            return res.status(200).json({
                message: "User disliked your tweet",
                success: true
            });
        } else {
            // Like
            await Tweet.findByIdAndUpdate(tweetId, { $push: { like: loggedInUserId } });
            return res.status(200).json({
                message: "User liked your tweet",
                success: true
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};


//these 2 api is not properly working

//  export const getAllTweets= async(req,res)=>{
// //loggedinuser ka tweet + following user tweet
//         try {

//             const id = req.params.id;
//             const loggedInUser = await findById(id);
//             const loggedInUserTweets = await Tweet.find({userId : id});
//             const followingUserTweet = await Promise.all(loggedInUser.following.map(otherUserId => {
//                 return Tweet.find({userId: otherUserId});
//             }));
//             return res.status(200).json({
//                 tweets:loggedInUser.Tweets.concat(...followingUserTweet)
//             })
//         } catch (error) {
//              console.log(error);
//         }
//  }



//  export const getFollowingTweets= async (req,res)=>{
//     try {
//         const id = req.params.id;
//         const loggedInUser = await findById(id);
//         const followingUserTweet = await Promise.all(loggedInUser.following.map(otherUserId => {
//             return Tweet.find({userId: otherUserId});
//         }));
//         return res.status(200).json({
//             tweets:[].concat(...followingUserTweet)
//         })
//     } catch (error) {
        
//     }
//  }


import { User } from "../models/userSchema.js"; // Import the User model

export const getAllTweets = async (req, res) => {
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id); // Corrected findById
        const loggedInUserTweets = await Tweet.find({ userId: id });
        const followingUserTweets = await Promise.all(loggedInUser.following.map(otherUserId => {
            return Tweet.find({ userId: otherUserId });
        }));
        return res.status(200).json({
            tweets: loggedInUserTweets.concat(...followingUserTweets) // Fixed concatenation
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const getFollowingTweets = async (req, res) => {
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id); // Corrected findById
        const followingUserTweets = await Promise.all(loggedInUser.following.map(otherUserId => {
            return Tweet.find({ userId: otherUserId });
        }));
        return res.status(200).json({
            tweets: [].concat(...followingUserTweets)
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}
