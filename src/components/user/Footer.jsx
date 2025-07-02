import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    const date = new Date().getFullYear()
  return (
    <>
      <div className='bg-blue-600 py-4 w-full'>
        <div className="max-w-7xl mx-auto justify-center flex items-center">
            <p className='text-white'>&copy; Copyright {date} | <Link to={'https://www.mridulsinghsaklani.com'} target='_blank'>www.mridulsinghsaklani.com</Link> </p>
        </div>

      </div>
    </>
  )
}

export default Footer