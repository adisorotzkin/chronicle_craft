import React from 'react'
import { apiService } from '../service/apisService';


const DeleteAccount = () => {
  const { userData, setUserData } = useContext(AppContext);
  const userToken = localStorage.getItem('token');
  const { updateAuthenticatedData } = apiService();

  useEffect(async() => { 
    const updatedUserInfo = {
      username: userData.username,
      email: userData.email,
      bio: userData.bio,
      profilePicture: userData.profilePicture,
      dateOfBirth: userData.dateOfBirth,
      registrationDate: userData.registrationDate, 
      active : false
    };
    const updatedData = await updateAuthenticatedData('/users/',userData._id, updatedUserInfo, userToken);
    
  }, [])

  return (
    <div></div>
  )
}

export default DeleteAccount