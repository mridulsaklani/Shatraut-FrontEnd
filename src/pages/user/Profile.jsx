import React, {useState, useEffect} from 'react'
import ProfileComponent from '../../components/user/ProfileComponent'
import api from '../../components/common/api'
import BlogsProfile from '../../components/user/BlogsProfile'

const Profile = () => {
    const [userData, setUserData] = useState({})
    const [userDataLoading, setUserDataLoading] = useState(false)


    const getUserData = async()=>{

      setUserDataLoading(true)
        try {
            const response = await api.get('/user/single-user', {withCredentials: true})
            if(response.status===200){
                setUserData(response?.data?.user)
            }
        } catch (error) {
            console.log(error)
        }
        finally{
          setUserDataLoading(false)
        }
    }

    useEffect(() => {
      getUserData()
    }, [])
    
  return (
    <>
      <ProfileComponent userData={userData} userDataLoading={userDataLoading}/>
      <BlogsProfile/>
    </>
  )
}

export default Profile