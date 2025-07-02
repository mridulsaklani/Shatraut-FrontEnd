import { Outlet } from "react-router-dom"
import Navbar from "./components/user/Navbar"
 import { ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/user/Footer";




function App() {
 

  return (
    <>
    <ToastContainer />
    <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
