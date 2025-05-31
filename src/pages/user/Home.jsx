import React,{useState, useEffect} from 'react'
import api from "../../components/common/api"
import parse from 'html-react-parser'

// Media

import img from '../../assets/mridul.jpg'
import { CiMenuKebab } from "react-icons/ci";
import { FaRegThumbsUp, FaThumbsUp, FaCommentDots } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Home = () => {

  const [blogData, setBlogData] = useState([])

  const getBlogData = async()=>{
    try {
      const response = await api.get('/blog/get-all-blogs', {withCredentials: true})
      if(response.status === 200){
        setBlogData(response.data?.blogdata)
        
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getBlogData()
  }, [])
  

  return (
    <>
      <div className="max-w-7xl mx-auto py-14">
        <div className=" flex flex-col gap-5">
           {blogData.map((item, index)=>(
            <div key={item._id} className='border-1 border-stone-200 rounded-lg w-full bg-white p-8 flex flex-col gap-6 cursor-pointer  hover:shadow-[0_0_10px_#00000030]  transition-all duration-300'>
              <div className='flex items-center gap-3 justify-between'>
                 <Link to={`/user-profile/${item.createdBy}`} className='w-1/2 flex items-center gap-3'>
                   <img className='h-11 w-11 rounded-full object-cover' src={img} alt="user" />
                   <div className="flex flex-col gap-0.5">
                    <h3 className='font-medium'>{item?.creator?.name || "N/A" }</h3>
                    <p className='text-sm'>{new Date(item.created_at).toLocaleDateString()}</p>
                   </div>
                 </Link >
                 <div className="w-1/2 flex justify-end items-center gap-5 text-xl">
                 <span className='text-white bg-blue-600 rounded-full px-5 py-1.5 text-sm capitalize cursor-pointer hover:scale-103 transition-all duration-300'>{item?.category}</span>
                  <span className='h-9 w-9 rounded-full flex justify-center items-center bg-stone-100 hover:bg-stone-200 transition-all duration-300'><CiMenuKebab /></span>
                 </div>
              </div>
              <div className="w-full bg-stone-50 p-6 rounded-lg flex flex-col gap-3 ">
                   <h2 className='font-semibold text-2xl capitalize'>
                    {item?.title || "N/A"}
                   </h2>
                   <div>
                    {parse(item?.content) || "N/A"}
                   </div>
              </div>
              <div className='flex justify-end gap-4'>
              <div className='flex items-center gap-3 bg-sky-100 rounded-full pr-5 cursor-auto'><button className="h-9 w-9 cursor-pointer rounded-full bg-blue-600 hover:bg-blue-700 text-white flex justify-center items-center hover:scale-103 transition-all duration-300">
                <span className='text-lg'><FaRegThumbsUp /></span>
              </button> <span>100</span></div>
              <div className='flex items-center gap-3 bg-sky-100 rounded-full pr-5 cursor-auto'><button className="h-9 w-9 cursor-pointer rounded-full bg-blue-600 hover:bg-blue-700 text-white flex justify-center items-center hover:scale-103 transition-all duration-300">
                <span className='text-lg'><FaCommentDots /></span>
              </button> <span>100</span></div>
              </div>
               
            </div>
           ))}
        </div>
      </div>
    </>
  )
}

export default Home