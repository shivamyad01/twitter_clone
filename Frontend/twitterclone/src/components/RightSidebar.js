import React from 'react';
import { CiSearch } from "react-icons/ci";
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

function RightSidebar({ otherUsers }) {
  return (
    <div className='w-[22%]'>
      <div className='flex items-center p-2 bg-gray-100 rounded-full outline-none w-full'>
        <CiSearch />
        <input type="text" className='bg-transparent outline-none px-2' placeholder='Search' />
      </div>
      <div className='p-4 bg-gray-100 rounded outline-none mt-2'>
        <h1 className='font-bold text-lg mb-4'>Who to follow</h1>
        {/* User cards */}
        {otherUsers?.map((user) => (
          <div key={user?._id} className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <Avatar
                src="https://avatars.githubusercontent.com/u/91522991?v=4"
                size="40"
                round={true}
                className="mr-2"
              />
              <div>
                <h1 className='font-bold'>{user?.name}</h1>
                <p className='text-sm'>@{user?.username}</p>
              </div>
            </div>
            <Link to={`/profile/${user?._id}`}>
            <button className='px-3 bg-black rounded-full text-white hover:bg-gray-800'>Profile</button>
            </Link>
           
          </div>
        ))}
       
      </div>
    </div>
  );
}

export default RightSidebar;
