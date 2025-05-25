import React,{useState, useEffect} from 'react'
import api from "../../components/common/api"

// Media

import img from '../../assets/mridul.jpg'
import { CiMenuKebab } from "react-icons/ci";

const Home = () => {

  const [blogData, setBlogData] = useState([])

  const getBlogData = async()=>{
    try {
      const response = await api.get('/blog/get-all-blogs', {withCredentials: true})
      if(response.status === 200){
        setBlogData(response.data?.blogdata)
        print(response.data?.blogdata)
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
            <div key={item._id} className='border-1 border-stone-200 rounded-lg w-full bg-white p-8 flex flex-col gap-6'>
              <div className='flex items-center gap-3 justify-between'>
                 <div className='w-1/2 flex items-center gap-3'>
                   <img className='h-11 w-11 rounded-full object-cover' src={img} alt="user" />
                   <div className="flex flex-col gap-0.5">
                    <h3 className='font-medium'>{item?.creator?.name || "N/A" }</h3>
                    <p className='text-sm'>{new Date(item.created_at).toLocaleDateString()}</p>
                   </div>
                 </div>
                 <div className="w-1/2 flex justify-end items-center gap-5 text-xl">
                 <span className='text-white bg-blue-600 rounded-full px-5 py-1.5 text-sm capitalize'>{item?.category}</span>
                  <span className='h-9 w-9 rounded-full flex justify-center items-center bg-stone-100'><CiMenuKebab /></span>
                 </div>
              </div>
              <div className="w-full bg-stone-50 p-6 rounded-lg flex flex-col gap-3 ">
                   <h2 className='font-semibold text-2xl capitalize'>
                    {item?.title || "N/A"}
                   </h2>
                   <div>
                    {item?.content || "N/A"}
                   </div>
              </div>
               
            </div>
           ))}
        </div>
      </div>
    </>
  )
}

export default Home