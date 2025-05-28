import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProtectedRoute from './routes/ProtectedRoutes.jsx'

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

// PAGES

import Home from './pages/user/Home.jsx'
import Signup from './components/user/Signup.jsx'
import VerifyOTP from './pages/user/VerifyOTP.jsx'
import Login from './pages/user/Login.jsx'
import CreateBlog from './pages/user/CreateBlog.jsx'
import Profile from './pages/user/Profile.jsx'
import CommonOutlet from './pages/common/CommonOutlet.jsx'
import UpdateProfile from './pages/user/UpdateProfile.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route index element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path='/verify-otp' element={<VerifyOTP/>} />
      <Route path="/login" element={<Login/>}  />
      
      <Route path="/create-blog" element={<ProtectedRoute allowedRoles={['admin', 'user']}><CreateBlog/>  </ProtectedRoute>} />
      <Route path='/profile' element={<ProtectedRoute allowedRoles={['admin', 'user']}><CommonOutlet/></ProtectedRoute>}>
        <Route index element={<Profile/>}/>
        <Route path='update-profile/:id' element={<UpdateProfile/>}/>
      </Route>
     
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </StrictMode>,
)
