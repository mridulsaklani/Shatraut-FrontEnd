// components/Preloader.jsx
import React from "react";

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-blue-600">Satraut</p>
    </div>
  );
};

export default Preloader;
