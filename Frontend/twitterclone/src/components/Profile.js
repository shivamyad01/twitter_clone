import React from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';

import { useSelector } from 'react-redux';
import useGetProfile from '../hooks/useGetProfile';




function Profile() {
const { user,profile} =useSelector(store=>store.user);
const {id} =useParams()
useGetProfile(id)


  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      <div>
        {/* Header */}
        <div className="flex items-center">
          <Link to="/" className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer">
            <IoIosArrowRoundBack />
          </Link>
          <div>
            <h1 className="font-bold text-lg">{profile?.name}</h1>
            <p className="text-gray-500 text-sm">10 posts</p>
          </div>
        </div>

        {/* Profile Image */}
        <img src="https://pbs.twimg.com/profile_banners/1496774870633529347/1707988823/1500x500" alt="profileimage" />

        {/* Avatar and Edit Profile Button */}
        <div className="ml-5 relative flex justify-between">
          <div className="relative bottom-10">
            <Avatar
              className="border border-white rounded-full"
              src="https://avatars.githubusercontent.com/u/91522991?v=4"
              size="90"
              round={true}
            />
          </div>
          <div className="text-right mr-5 mb-6">
            <button className="border-gray-400 px-4 py-1 border mt-1 rounded-full hover:bg-gray-200">Edit Profile</button>
          </div>
        </div>

        {/* User Information */}
        <div className='relative ml-5 bottom-5'>
          <h1>{profile?.name}</h1>
          <p>@{profile?.username}</p>
        </div>
        <div className='m-4 text-sm '>
          <p>"Enjoying a sunny day 🌞 while sipping on coffee ☕ and embracing life's little joys. Grateful for every moment! 😊"</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
