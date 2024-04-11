import React from "react";
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

import { TWEET_API_END_POINT } from "../utils/constant";
import { getRefresh } from "../redux/tweetSlice";

function Tweet({ tweet }) {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/like/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        }
      );
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while processing your request.");
      }
      console.error(error);
    }
  };

  const deleteTweetHandler = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while deleting the tweet.");
      }
      console.error(error);
    }
  };

  return (
    <div className=" border-b border-gray-200">
      <div className="flex ml-4 mt-4">
        <div>
          <Avatar
            src="https://avatars.githubusercontent.com/u/91522991?v=4"
            size="40"
            round={true}
          />
        </div>
        <div>
          <div className="flex items-center">
            <h1 className="font-bold ml-2">{tweet?.userDetails[0]?.name}</h1>
            <p className="text-gray-500 text-sm ml-2">
              @{tweet?.userDetails[0]?.username} 1m
            </p>
          </div>

          <div className="ml-2 text-gray-700">
            <p>{tweet?.description}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center  mt-4 mb-2">
        <div className="ml-9 flex hover:bg-green-200 rounded-full cursor-pointer">
          <FaRegComment className="mt-2" />
          <p className="ml-2">0</p>
        </div>

        <div
          onClick={() => likeOrDislikeHandler(tweet?._id)}
          className="flex hover:bg-pink-200 rounded-full cursor-pointer"
        >
          <CiHeart className="mt-1" />
          <p className="ml-2">{tweet?.like?.length}</p>
        </div>

        <div className="mr-9 flex  hover:bg-yellow-200 rounded-full cursor-pointer">
          <CiBookmark className="mt-1" />
          <p className="ml-2">0</p>
        </div>
        {user?._id === tweet?.userId &&  (
          <div
            onClick={() => deleteTweetHandler(tweet?._id)}
            className="mr-9 flex  hover:bg-yellow-200 rounded-full cursor-pointer"
          >
            <MdDeleteOutline className="mt-1" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Tweet;
