import React, {useState,useEffect} from 'react'
import api from './api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const LogoutPopup = ({setShowLogout}) => {
    const [errMessage, setErrMessage] = useState(null)

    const navigate = useNavigate()

    const handleLogout = async()=>{
   try {
    const response = await api.post('/user/logout',{},{withCredentials: true})
    if(response.status === 200){
        toast.success("User logout successfully")
        navigate('/')
    }
   } catch (error) {
    console.error(error)
    setErrMessage(error.response.data.detail)
   }
    }
  return (
    <>
         <div className='fixed top-0 left-0 right-0 bottom-0 w-full backdrop-blur-sm bg-black/10 z-90 ' onClick={()=>setShowLogout(false)}>
           <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100 bg-white p-6 rounded-lg w-[550px]' >

            <h2 className='text-2xl font-semibold'>Are you sure to logout?</h2>
            <div className="flex justify-end gap-4 items-center">
                <button className='px-6 py-2 rounded-lg bg-green-500 text-white text-lg cursor-pointer hover:scale-105 transition-all duration-300' onClick={handleLogout}>Ok</button>
                <button className='px-6 py-2 rounded-lg bg-red-500 text-white text-lg cursor-pointer hover:scale-105 transition-all duration-300' onClick={()=>setShowLogout(false)}>Cancel</button>
            </div>

           </div>
         </div>
    </>
  )
}

export default LogoutPopup