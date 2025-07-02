import React, { useState, useEffect } from "react";
import TiptapEditor from "../../components/common/TiptapEditor";

import { FaCircleXmark } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import api from "../../components/common/api";
import { toast } from "react-toastify";
import parse from 'html-react-parser'

const CreateBlog = () => {
  const [title, setTitle] = useState(false);
  const [errMessage, seterrMessage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setTitle(formData.title.length >= 5 ? true : false);
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("/blog/add", formData, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("Blog uploaded successfully");
        setFormData({
          title: "",
          content: "",
          category: "",
        });
        setTitle(false)
      }
    } catch (error) {
      console.error(error);
      seterrMessage(error.response?.data?.detail);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto py-24 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold ">Create your own blog</h2>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <label htmlFor="title">Title </label>
            <div className="border-1 p-3 border-stone-200 outline-none w-full rounded-lg flex items-center">
              <input
                type="text"
                name="title"
                value={formData.title}
                className="  outline-none w-full "
                onChange={handleChange}
                placeholder="title"
              />
              {title ? (
                <FaCheckCircle className="text-green-500 text-xl" />
              ) : (
                <FaCircleXmark className="text-red-500 text-xl" />
              )}
            </div>
          </div>
          <TiptapEditor  setFormData={setFormData} formData={formData}/>
          <div className="flex flex-col gap-3">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              className="border-1 p-3 border-stone-200 outline-none w-full rounded-lg"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="" hidden>
                Select category
              </option>
              <option value="tech">Tech</option>
              <option value="lifestyle">LifeStyle</option>
              <option value="education">Education</option>
              <option value="travel">Travel</option>
            </select>
          </div>
          {errMessage && <div className="flex justify-end">
            <p className="text-red-500">{errMessage}</p>
          </div>}
          <div className="flex justify-end">
            <button
              disabled={
                formData.category === "" ||
                formData.title.length < 5 ||
                formData.title === ""
              }
              className="bg-blue-600 px-5 py-2 text-white hover:scale-103 transition-all duration-300 rounded-lg cursor-pointer disabled:bg-blue-400"
             onClick={handleSubmit}>
              Upload
            </button>
          </div>
        </div>
        <div className="border-b-1 border-stone-300"></div>
        <div className="flex flex-col gap-6 blog">
          <h2 className="text-2xl font-bold">Preview:</h2>
          <div className="bg-blue-50 rounded-2xl p-8">
            {formData.content ? parse(formData.content) : "No preview available"}
          </div>

        </div>
      </div>
    </>
  );
};

export default CreateBlog;
