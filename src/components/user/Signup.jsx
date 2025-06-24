import React, { useState } from "react";
import api from "../common/api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";


import { FaCircleXmark } from "react-icons/fa6";

const Signup = () => {
  const [errMessage, setErrMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    occupation: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      if (formData.password.length < 8) return setErrMessage('Password should more then 7 words')
      if (formData.username.length < 6) return setErrMessage('username should more then 6 words')
      const response = await api.post("/user/register", formData);
      if (response.status === 201) {
        toast.success(response.response?.data?.detail);
        window.localStorage.setItem('verify-email', formData.email)
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
          occupation: "",
          image: null,
        });
      navigate('/verify-otp')
      }
    } catch (error) {
      console.error(error);
      setErrMessage(error.response?.data?.detail);
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-[690px] flex flex-col gap-5">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="john_doe"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
                required
              />
             
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Occupation
              </label>
              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Occupation</option>
                <option value="student">Student</option>
                <option value="employed">Employed</option>
                <option value="unemployed">Unemployed</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-2 py-1 border rounded-lg"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 h-24 w-24 object-cover rounded-full mx-auto"
                />
              )}
            </div>
          </div>
         {errMessage && <div className="flex justify-end">
          <p className="text-red-500">  {errMessage} </p>
          </div>}

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </div>
          <div className="flex justify-center items-center">
            <p>Have an account <Link to="/login" className="text-blue-500 underline"> Sign in </Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
