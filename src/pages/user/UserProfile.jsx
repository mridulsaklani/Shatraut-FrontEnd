import React,{useState, useEffect} from 'react'
import UserProfileComponent from '../../components/user/UserProfileComponent'
import api from '../../components/common/api'
import { useParams } from 'react-router-dom'


const UserProfile = () => {
    const [userData, setUserData] = useState({})
    const [userDataLoading, setUserDataLoading] = useState(false)


    const {id} = useParams()

    const getUserData = async(id)=>{
        setUserDataLoading(true)
        try {
            const response = await api.get(`/user/user-profile/${id}`, {withCredentials: true})
            if(response.status === 200){
                setUserData(response.data?.user)
            }
        } catch (error) {
            console.error(error)
        }
        finally{
            setUserDataLoading(false)
        }
    }


    useEffect(() => {
      getUserData(id)
    }, [])
    



  return (
    <>
    <UserProfileComponent userData={userData} userDataLoading={userDataLoading}/>
    </>
  )
}

export default UserProfile