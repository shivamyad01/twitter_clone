import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice';
import tweetSlice from './tweetSlice';
const store =configureStore({
    reducer:{
     //actions
     user:userSlice,
     tweets:tweetSlice
    }
})

export default store;