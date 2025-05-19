import { Outlet } from "react-router-dom"
import Navbar from "./components/user/Navbar"
 import { ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';




function App() {
 

  return (
    <>
    <ToastContainer />
    <Navbar/>
      <Outlet/>
    </>
  )
}

export default App
