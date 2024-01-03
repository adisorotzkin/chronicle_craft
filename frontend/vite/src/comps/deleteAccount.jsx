import React, { useContext, useEffect } from 'react';
import { apiService } from '../service/apisService';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';

const DeleteAccount = () => {
  const { userData, setUserData } = useContext(AppContext);
  const userToken = localStorage.getItem('token');
  const { updateAuthenticatedData } = apiService();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = 'black';

    const deleteAccount = async () => {
      const updatedUserInfo = {
        username: userData.username,
        email: userData.email,
        bio: userData.bio,
        profilePicture: userData.profilePicture,
        dateOfBirth: userData.dateOfBirth,
        active: false
      };

      try {
        const updatedData = await updateAuthenticatedData('/users/', userData._id, updatedUserInfo, userToken);
        console.log(updatedData);
        navigate('/welcome');
      } catch (error) {
        console.error('Error updating user data:', error);
        // Handle error as needed
      }
    };

    // Call the function
    deleteAccount();
  }, [userData._id, userData, userToken, updateAuthenticatedData, navigate]);

  return (
    <div>
      Deactivating account...
    </div>
  );
};

export default DeleteAccount;
