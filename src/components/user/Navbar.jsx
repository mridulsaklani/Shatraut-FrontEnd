import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import api from '../common/api';
import LogoutPopup from '../common/LogoutPopup';
import { motion, useScroll, useTransform } from "framer-motion";


//Media

import { HiOutlineDocumentAdd } from "react-icons/hi";
import { MdEdit } from "react-icons/md";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false)
  const [isAuthenticate, setIsAuthenticate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

    const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);


  const verifyAuth = async()=>{
    try {
      const response = await api.get("/auth/verify-auth", {withCredentials:true})

      if(response.status === 200){
        setIsAuthenticate(response.data?.isAuthenticated)
      }
    } catch (error) {
      console.error(error)
    }
  }

  

  useEffect(() => {
    verifyAuth()
  }, [showLogout])
  
  return (
    <>
    {showLogout &&<LogoutPopup setShowLogout={setShowLogout}/>}
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4  py-4 flex justify-between items-center">
      
        <div className="text-2xl font-bold text-blue-600 tracking-tight w-1/5">
          Straut
        </div>

        
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium w-2/5">
          <li className=""><Link className='hover:text-blue-600 transition duration-300 cursor-pointer' to={'/'}>Home </Link></li>
          <li className=""><Link className='hover:text-blue-600 transition duration-300 cursor-pointer' to={'/about'}>about </Link></li>
          {isAuthenticate && <li className=""><Link className='hover:text-blue-600 transition duration-300 cursor-pointer' to={'/profile'}>profile </Link></li>}
          
        </ul>

        
        <div className="  flex items-center gap-4 w-2/5 justify-end">
        <div className="relative" onMouseEnter={()=>setShowEdit(true)} onMouseLeave={()=>(setShowEdit(false))}>
          <div className='h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:scale-103 transition-all duration-300 cursor-pointer hover:shadow-[0px_0px_10px_#2B7FFF70]' >
                <MdEdit className='text-xl'/>
          </div>
          <motion.ul animate={showEdit  ? {opacity: 1, y: 0, display: "block"}: {opacity: 0, y: 10, display: "none" }} transition={.4} viewport={{once: true}} className='absolute w-44 border-1 border-stone-200 rounded-lg p-4  z-20 top-14 -left-10 bg-white'>
            <li><Link to={'/create-blog'} className='flex items-center gap-2'><HiOutlineDocumentAdd className='text-lg'/>New Blog</Link></li>

          </motion.ul>
          </div>
          {isAuthenticate? <Link className='bg-blue-600 text-white px-5 py-2 rounded-full shadow hover:bg-blue-700 transition duration-300' onClick={()=>setShowLogout(true)}>Logout</Link> :<Link to={'signup'} className="bg-blue-600 text-white px-5 py-2 rounded-full shadow hover:bg-blue-700 transition duration-300">
            Get Started
          </Link>}
        </div>

      
        
      </nav>
    </header>
    </>
  );
};

export default Navbar;
