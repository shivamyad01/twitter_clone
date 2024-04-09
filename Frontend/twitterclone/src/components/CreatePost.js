import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { AiOutlinePicture } from "react-icons/ai";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getRefresh } from "../redux/tweetSlice";

function CreatePost() {
  const [description, setDescription] = useState("");
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRefresh());
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
      console.log("button clicked");
      dispatch(getRefresh());
    } catch (error) {
      console.error("Error occurred while posting:", error);
    }
  };

  return (
    <div className="w-[100%]">
      <div>
        <div className="flex items-center justify-between  ">
          <div className="cursor-pointer hover:bg-gray-200 w-full text-center">
            <h1 className="font-bold text-gray-700 py-2 ">For you</h1>
          </div>
          <div className="cursor-pointer  hover:bg-gray-200 w-full text-center">
            <h1 className="font-bold text-gray-700 py-2">Following</h1>
          </div>
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
