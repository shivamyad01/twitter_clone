import React from "react";
import { CiHome } from "react-icons/ci";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";
import toast from "react-hot-toast"
function LeftSidebar() {
  const { user} =useSelector(store=>store.user);
  const navigate = useNavigate();

  const dispatch=useDispatch()
   const logoutHandler= async()=>{
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      dispatch(getUser(null))
      dispatch(getOtherUsers(null))
      dispatch(getMyProfile(null))
      toast.success(res.data.message)
      navigate('/login')
    } catch (error) {
      
    }
   }
 
  return (
    <div className="w-[20%]">
      <div>
        <div>
        <img width={"40px"} className="ml-4"
            src="data:image/png;base64,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"
            alt="twitter"
          />
        </div>
        <div className="my-4" >
        <Link to="/" className="flex items-center hover:bg-gray-100 px-4 py-2 rounded-full cursor-pointer">
        <CiHome />
        <h1 className="font-bold text-lg ml-2">Home</h1>
      </Link>

      <div className="flex items-center hover:bg-gray-100 px-4 py-2 rounded-full cursor-pointer">
        <CiHashtag />
        <h1 className="font-bold text-lg ml-2">Explore</h1>
      </div>

      <div className="flex items-center hover:bg-gray-100 px-4 py-2 rounded-full cursor-pointer">
        <IoIosNotificationsOutline />
        <h1 className="font-bold text-lg ml-2">Notification</h1>
      </div>

      <Link to={`/profile/${user?._id}`} className="flex items-center hover:bg-gray-100 px-4 py-2 rounded-full cursor-pointer">
        <CiUser />
        <h1 className="font-bold text-lg ml-2">Profile</h1>
      </Link>
      <div className="flex items-center hover:bg-gray-100 px-4 py-2 rounded-full cursor-pointer">
        <CiBookmark />
        <h1 className="font-bold text-lg ml-2">Bookmarks</h1>
      </div>


      <div onClick={logoutHandler}  className="flex items-center hover:bg-gray-100 px-4 py-2 rounded-full cursor-pointer">

  <CiLogout />
  <h1 className="font-bold text-lg ml-2">Logout</h1>
</div>

             <button className="px-4 py-2 border-none text-md bg-sky-500 rounded-full text-white font-bold">Post</button>
        </div>
      </div>

    
    </div>
  );
}

export default LeftSidebar;
