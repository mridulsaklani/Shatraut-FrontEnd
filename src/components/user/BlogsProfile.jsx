import React from 'react'

const BlogsProfile = ({blogCount}) => {
  return (
    <>
      <div className='flex flex-col gap-8 max-w-7xl mx-auto '>
          <div className='bg-blue-50 p-5 px-8 rounded-lg'>
             <h2 className='text-2xl font-semibold'>Blog Details</h2>
          </div>

          <div className="grid grid-cols-2 gap-5 items-center">
              <div className="flex items-center gap-3 text-xl tracking-wide"><h3>Total Blogs:</h3><span className='text-blue-500'>{blogCount || "N/A"}</span></div>
              <div className="flex items-center gap-3 text-xl tracking-wide"><h3>Last Activity:</h3><span className='text-blue-500'>{blogCount || "N/A"}</span></div>
          </div>
          
      </div>
    </>
  )
}

export default BlogsProfile