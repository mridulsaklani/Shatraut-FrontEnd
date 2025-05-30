import React,{useState, useEffect} from 'react'
import api from '../../components/common/api'
import { useNavigate, useParams } from 'react-router-dom'
import UpdateProfileForm from '../../components/user/UpdateProfileForm'
import { toast } from 'react-toastify'


const UpdateProfile = () => { 
     const [errMessage, setErrMessage] = useState(null);
     const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState({})
  const [userDataLoading, setUserDataLoading] = useState(false)
  const [formData, setFormData] = useState({
    name:"",
    username:"",
    occupation:""
  })

    const navigate = useNavigate()
    const getUserData = async()=>{

      setUserDataLoading(true)
        try {
            const response = await api.get('/user/single-user', {withCredentials: true})
            if(response.status===200){
                setUserData(response?.data?.user)
                setFormData({
                    name : response?.data?.user?.name,
                    username: response?.data?.user?.username,
                    occupation: response?.data?.user?.occupation,

                })
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

    const handleChange = (e)=>{
      const {name, value} = e.target;
      setFormData({...formData, [name]: value})
    }


    const handleSubmit = async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        try {
            const response = await api.patch('/user/update', formData, {withCredentials: true})
            if(response.status === 200){
                toast.success(`${formData.name} profile updated successfully `)
                setErrMessage(null)
                navigate('/profile')
            }
        } catch (error) {
            console.error(error);
            setErrMessage(error?.response?.data?.detail || error?.response?.data?.message )
        }
        finally{
            setIsLoading(false)
        }
    }
    
  return (
    <>
           <UpdateProfileForm userData={userData} userDataLoading={userDataLoading} isLoading={isLoading} handleSubmit={handleSubmit} formData={formData} handleChange={handleChange} errMessage={errMessage} />
    </>
  )
}

export default UpdateProfile