import React from 'react';
import CreatePost from './CreatePost';
import Tweet from './Tweet';
import { useSelector } from 'react-redux';

function Feed() {
  const { tweets } = useSelector((store) => store.tweets)  // Default to an empty object if tweets is undefined
  return (
    <div className='w-[50%] border border-gray-200'>
      <div>
        <CreatePost />
        {tweets?.map((tweet) => (
          <Tweet key={tweet?._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
