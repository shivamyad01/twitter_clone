import express from 'express';
import databaseConnection from './config/database.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoute from "./routes/userRoute.js"
import tweetRoute from "./routes/tweetRoute.js"
import cors from "cors";
dotenv.config(); // Load environment variables from .env file

const app = express();

const port = process.env.PORT || 3000;

databaseConnection(); // Establish database connection

  app.use(express.urlencoded({
    extended:true
  }));
  app.use(express.json())
  app.use(cookieParser())
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
  };
  
  app.use(cors(corsOptions));
app.use("/api/v1/user",userRoute)
app.use("/api/v1/tweet", tweetRoute)
// app.get("/home",(req,res)=>{
//     res.status(200).json({
//         massage:"comming from backend"
//     })
  
// })

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
