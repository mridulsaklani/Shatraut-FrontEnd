import React from "react";
import { Link } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const ProfileComponent = ({ userData, userDataLoading }) => {

  const date = new Date(userData?.created_at).toLocaleDateString();

  console.log(date)
  return (
    <>
      <div className="max-w-7xl mx-auto py-24 flex flex-col gap-10">
        <div className="flex justify-between items-center gap-5">
          <div></div>
          <div><Link to={`update-profile/${userData._id}`} className="bg-blue-500 px-5 py-2 rounded-lg text-white hover:bg-blue-600 transition-all duration-300">  Edit Profile </Link></div>
        </div>
        <div className="flex items-center justify-center w-full gap-5 ">
          <div className="w-1/4">
            <img src="" alt="" />
          </div>
           
         <div className="w-3/4 grid grid-cols-2 items-center gap-5">
            <div className="flex items-center gap-3 text-xl tracking-wide">
              <h3>Name:</h3>{" "}
             {userDataLoading? <Skeleton variant="text" height={30} />: <span className="text-blue-500">{userData?.name || 'N/A'}</span>}
            </div>
            <div className="flex items-center gap-3 text-xl tracking-wide">
              <h3>Username:</h3>{" "}
              {userDataLoading ? <Skeleton variant="text" height={30} />  :<span className="text-blue-500">{userData?.username || 'N/A'}</span>}
            </div>
            <div className="flex items-center gap-3 text-xl tracking-wide">
              <h3>Email:</h3>{" "}
             {userDataLoading ? <Skeleton variant="text" height={30} />  : <span className="text-blue-500">{userData?.email || 'N/A'}</span>}
            </div>
            <div className="flex items-center gap-3 text-xl tracking-wide">
              <h3>Occupation:</h3>{" "}
             {userDataLoading ? <Skeleton variant="text" height={30} />  : <span className="text-blue-500">{userData?.occupation || 'N/A'}</span>}
            </div>
            <div className="flex items-center gap-3 text-xl tracking-wide">
              <h3>Role:</h3>{" "}
             {userDataLoading ? <Skeleton variant="text" height={30} />  : <span className="text-blue-500 capitalize">{userData?.role || 'N/A'}</span>}
            </div>
            <div className="flex items-center gap-3 text-xl tracking-wide">
              <h3>Member Since:</h3>{" "}
             {userDataLoading ? <Skeleton variant="text" height={30} />  : <span className="text-blue-500">{date || 'N/A'}</span>}
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
