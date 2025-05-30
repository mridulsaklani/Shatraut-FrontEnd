import React from 'react'

const UpdateProfileForm = ({userData, userDataLoading, errMessage, handleSubmit, isLoading, formData, handleChange}) => {
  return (
    <>
      <div className='max-w-7xl mx-auto py-20 flex flex-col gap-5'>
        <h2 className='text-2xl font-bold '>Update Profile </h2>
        <form className='bg-blue-50 p-8 rounded-lg' onSubmit={handleSubmit}>
              <div className='grid grid-cols-2 gap-5 items-center'>
                <div className="flex flex-col gap-3">
                    <label htmlFor="name" className='text-lg'><span className='text-red-500 text-lg'>*</span>Name</label>
                    <input type="text" name='name' value={formData.name} className='w-full px-4 py-2 border rounded-lg border-stone-400 outline-none bg-white' onChange={handleChange} />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="username" className='text-lg'><span className='text-red-500 text-lg'>*</span>Username</label>
                    <input type="text" name='username' value={formData.username} className='w-full px-4 py-2 border rounded-lg border-stone-400 outline-none bg-white' onChange={handleChange} />
                </div>
                 <div className="flex flex-col gap-3">
              <label className="block text-sm font-medium text-gray-700">
                Occupation
              </label>
              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 border-stone-400 bg-white"
                required
              >
                <option value="">Select Occupation</option>
                <option value="student">Student</option>
                <option value="employed">Employed</option>
                <option value="unemployed">Unemployed</option>
              </select>
            </div>
              </div>
              <div className="flex justify-end">
<p className='text-red-500'>{errMessage}</p>
              </div>
              <div className="flex justify-end gap-2">
                <button type="submit" className='bg-blue-600 text-white px-5 py-2 rounded-lg  cursor-pointer hover:scale-105 transition-all duration-300'>{isLoading ? "Submitting..." : "Submit"}</button>
              </div>
             
        </form>
      </div>
    </>
  )
}

export default UpdateProfileForm