import React, { useState } from 'react';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast"

import { getUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  


  const navigate=useNavigate();
 const dispatch=useDispatch()
  const submitHandler = async (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json', // Adjust content type as needed
      // Add any other headers here

    };

    if (isLogin) {
      // Login
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/login`,{ email, password },{ 
             headers:{
              'Content-Type':"application/json"
             }, 

           
          }
          
        );
        toast.success(res.data.message)
        //optional channing
        dispatch(getUser(res?.data?.user))
        
        if(res.data.success){
          navigate("/");
        }
       
      } catch (error) {
        toast.success(error.response.data.message)
        console.log(error);
      }
    } else {
      // Signup
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/register`,
          { name, username, email, password },
          { headers }
        );
        console.log(res);
        toast.success(res.data.message)
      } catch (error) {
        toast.success(error.response.data.message)
        console.log(error);
      }
    }
  };

  const loginSingupHandler = () => {
    setIsLogin(!isLogin);
   
  };

   

  return (
    <div className='w-screem h-screen flex items-center justify-center'>
      <div className='flex items-center w-[80%] justify-evenly '>
        <div>
        <img width={"300px"} className="ml-5  "
            src="data:image/png;base64,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"
            alt="twitter"
          />
        </div>

        <div>
        <div>
          <h1 className='font-bold  text-6xl'>Happening Now</h1>
        </div>
          <h1 className='my-4  font-bold text-2xl'>{isLogin ? "Login":"Signup"}</h1>
        <form onSubmit={submitHandler} className='flex flex-col w-[50%]' action="">
          {
            !isLogin &&(<>
             <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Name' className='outline-blue border border-gray-800 px-3 py-1 rounded-full my-1 font-semibold ' />
          <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}  placeholder='Username' className='outline-blue border border-gray-800 px-3 py-1 rounded-full my-1 font-semibold' />
            
            </>

            )
          }
         
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder='Email' className='outline-blue border border-gray-800 px-3 py-1 rounded-full my-1 font-semibold'/>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='Password'className='outline-blue border border-gray-800 px-3 py-1 rounded-full my-1 font-semibold' />
          <button className='bg-[#109BF0] border-none py-2 rounded-full text-white' >{isLogin ? "Login":"Create Account"}</button>
          <h1 className=' text-sm mt-2 text-center'>{isLogin ? "Do not have a account?":"Already have an account?"}<span className=' font-bold text-blue-500 cursor-pointer' onClick={loginSingupHandler}>{isLogin ? "Signup":"Login"}</span> </h1>
        </form>
        
        </div>
      </div>
    </div>
  )
}

export default Login



