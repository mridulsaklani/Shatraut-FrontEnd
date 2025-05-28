import React,{useState, useEffect} from 'react'
import api from '../../components/common/api'
import { useParams } from 'react-router-dom'
import UpdateProfileForm from '../../components/user/UpdateProfileForm'


const UpdateProfile = () => {

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
           <UpdateProfileForm userData={userData} userDataLoading={userDataLoading}/>
    </>
  )
}

export default UpdateProfile