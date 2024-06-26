import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { AiOutlinePicture } from "react-icons/ai";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import {   getIsActive, getRefresh,  } from "../redux/tweetSlice";
import toast from "react-hot-toast"
function CreatePost() {
  const [description, setDescription] = useState("");
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const {isActive}=useSelector((store)=>store.tweets)

  useEffect(() => {
    dispatch(getRefresh);
  }, [dispatch]);

  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create/`,
        { description, id: user?._id },
        {
          withCredentials: true,
        }
      );
     
      dispatch(getRefresh());
      toast.success(res.data.message)
    } catch (error) {
      console.error("Error occurred while posting:", error);
    }
  };

  const forYouHandler=()=>{
dispatch(getIsActive(true))
  }

  const followingHandler =()=>{
    dispatch(getIsActive(false))
  }
  
  return (
    <div className="w-[100%]">
     <div className="flex items-center justify-between">
  <div onClick={forYouHandler} className={`cursor-pointer ${isActive ? "border-b-4 border-blue-600": ""} hover:bg-gray-200 w-full text-center py-2 px-4 transition duration-300 ease-in-out transform hover:-translate-y-1`}>
    <h1 className="font-bold text-gray-700">For You</h1>
  </div>
  <div onClick={followingHandler} className={`cursor-pointer ${!isActive ? "border-b-4 border-blue-600": ""} hover:bg-gray-200 w-full text-center py-2 px-4 transition duration-300 ease-in-out transform hover:-translate-y-1`}>
    <h1 className="font-bold text-gray-700">Following</h1>
  </div>
</div>


      <div>
        <div className="flex items-center p-4">
          <div className="ml-2 mt-2">
            <Avatar
              src="https://avatars.githubusercontent.com/u/91522991?v=4"
              size="40"
              round={true}
            />
          </div>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full outline-none border-none text-lg ml-2"
            type="text"
            placeholder="What is happening?!"
          />
        </div>
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <div>
            <AiOutlinePicture />
          </div>
          <button
            onClick={submitHandler}
            className="bg-[#109BF0] px-4 py-2 rounded-full"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
