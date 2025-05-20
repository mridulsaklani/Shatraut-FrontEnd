import React, { useRef, useState, useEffect } from 'react';
import api from '../../components/common/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = () => {
  const [errMessage, setErrMessage] = useState(null)
  const [verifyEmail, setVerifyEmail] = useState(null)
  const [isActive, setIsActive] = useState(false)

  const otpLength = 6;
  const [otp, setOtp] = useState(Array(otpLength).fill(''));

  const inputsRef = useRef([]);

  const navigate = useNavigate

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otpLength - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('Text').slice(0, otpLength);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    const nextIndex = pastedData.length < otpLength ? pastedData.length : otpLength - 1;
    inputsRef.current[nextIndex]?.focus();
  };

  useEffect(() => {
    let verifyEmails  = window.localStorage.getItem("verify-email")
    setVerifyEmail(verifyEmails)
  }, [])
  

  const handleSubmit = async() => {
    setIsActive(true)
    const otps = otp.join('');
    const email = verifyEmail
    try {
        const response = await api.patch('/user/verify-otp', {otp: otps, email})
        if(response.status === 200){
            window.localStorage.removeItem("verify-otp")
            toast.success("OPT verified successfully")
            navigate("/login")
            setErrMessage("")
        }
    } catch (error) {
        console.error(error)
        setErrMessage(error?.response?.data?.detail || "Something went wrong")
    }
    finally{
        setIsActive(false)
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 gap-6 px-4">
        <div className='bg-white p-7 rounded-xl flex flex-col gap-6'>
            <div className='flex flex-col gap-3'>
            <h2 className='text-2xl font-semibold text-center'>Verify OTP</h2>
            <p className='text-center'>we send otp on your email <br /> <span className='text-blue-500'>{verifyEmail}</span></p>
            </div>
      <div className="flex space-x-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="w-12 h-12 text-2xl text-center rounded-md border border-gray-300 focus:border-blue-600 focus:outline-none"
          />
        ))}
      </div>
      {errMessage && <div className='flex justify-end'>
         <p className='text-red-500'>{errMessage}</p>
        </div>}
      <button
        onClick={handleSubmit}
        className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
      >
       {isActive ? "Submitting" : "Submit"} 
      </button>
      </div>
    </div>
  );
};

export default VerifyOTP;
