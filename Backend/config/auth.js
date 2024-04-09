import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const isAuthenticated = async (req, res, next) => {
    try {
        const token  = req.cookies.token;
      
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }
        const decode = await jwt.verify(token, process.env.TOKEN_SECRET);
       
        req.user = decode.userId;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export default isAuthenticated;
