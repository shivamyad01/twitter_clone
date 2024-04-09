import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"; // Import jwt directly
export const Register = async (req, res) => {
    try {
        // Basic validation
        const { name, username, email, password } = req.body;
        if (!name || !username || !email || !password) {
            return res.status(401).json({
                message: "All fields are required",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exists",
                success: false
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 16);
        await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        return res.status(200).json({
            message: "Account created successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const Login = async(req,res)=>{
    try {
        const {email,password} =req.body;
        if(!email || !password){
            return res.status(401).json({
                message: "All fields are required",
                success: false
            });
        }
        const user = await User.findOne({ email }); // Fixed this line
        
        if(!user){
            return res.status(401).json({
                message:"incorrect email and password",
                success:false
            });
        }

        const isMatch = await bcryptjs.compare(password, user.password); // Fixed this line
        if(!isMatch){ // Fixed this line
            return res.status(404).json({
                message:"Incorrect email or password",
                success:false
            });
        }

        const tokenData = {
            userId: user._id // Fixed this line
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" }); // Fixed this line

        return res.status(201).cookie("token", token, { expiresIn: "1d" }).json({
            message: `Welcome back ${user.name}`, // Fixed this line
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


export const Logout =(req,res)=>{
    return res.cookie("token","",{expiresIn: new Date(Date.now()) }).json({
        message: "Successful Logout",
            success: true
    })
}



export const bookmarks = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
     
        
        const user = await User.findById(loggedInUserId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        
        if (user.bookmarks.includes(tweetId)) {
            // Remove bookmark
            await User.findByIdAndUpdate(loggedInUserId, { $pull: { bookmarks: tweetId } });
            return res.status(200).json({
                message: "Bookmark removed successfully",
                success: true
            });
        } else {
            // Add bookmark
            await User.findByIdAndUpdate(loggedInUserId, { $push: { bookmarks: tweetId } });
            return res.status(200).json({
                message: "Tweet bookmarked successfully",
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

export const getMyProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-password");
        
        return res.status(200).json({
            user
        });
    } catch (error) {
        console.log(error);
    }
};

export const getOtherUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const otherUsers = await User.find({ _id: { $ne: id } }).select("-password");
        if(!getOtherUsers){
            return res.status(401).json({
                message:"currently do not have any users",

            })
        }
        return res.status(200).json({
            otherUsers,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: "Internal server error",
        });
    }
};

export const follow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;

        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);

        if (!user.followers.includes(loggedInUserId)) {
            await user.updateOne({ $push: { followers: loggedInUserId } });
            await loggedInUser.updateOne({ $push: { following: userId } });
            return res.status(200).json({ message: `Successfully followed ${user.name}` });
        } else {
            return res.status(400).json({ message: `User ${user.name} already followed` });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const unfollow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id; // Assuming you're getting the logged in user's ID from the request body
        const userId = req.params.id; // Assuming you're getting the user ID to unfollow from the URL parameters

        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId);

        if (!loggedInUser || !user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (loggedInUser.following.includes(userId)) {
            await user.updateOne({ $pull: { followers: loggedInUserId } });
            await loggedInUser.updateOne({ $pull: { following: userId } });

            return res.status(200).json({
                message: `${loggedInUser.name} unfollowed ${user.name}`,
                success: true
            });
        } else {
            return res.status(400).json({ message: `User has not followed yet` });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
