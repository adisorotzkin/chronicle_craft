// Import necessary dependencies and components
import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';
import { apiService } from '../service/apisService';
import Navbar from '../static_comps/navbar';
import '../comps_css/updateProfile.css';

const UpdateProfile = () => {
  const { userData, setUserData } = useContext(AppContext);
  const userToken = localStorage.getItem('token');
  const navigate = useNavigate();
  const { updateAuthenticatedData } = apiService();

  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    username: userData.username,
    email: userData.email,
    registrationDate: userData.registrationDate,
    dateOfBirth: userData.dateOfBirth,
    bio: userData.bio,
    profilePicture: userData.profilePicture,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Function to handle the "Update Profile" button click
  const handleUpdateProfile = async () => {
    try {
      // Use the updateAuthenticatedData function to update the user profile
      const updatedData = await updateAuthenticatedData(
        '/users', // Update the URL according to your API endpoint
        userData.id, // Use the user ID or any identifier needed for the update
        updatedUserInfo,
        userToken
      );

      // Update the user data in the context with the latest information
      setUserData(updatedData);

      // Navigate back to the user profile page
      navigate('/profile');
    } catch (error) {
      console.error('Error updating user profile:', error);
      // Handle error as needed
    }
  };

  return (
    <div className="outer-main-update-profile">
      <Navbar/>
      <div className="inner-main-update-profile p-5">
        <h2>Update Your Profile</h2>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <form>
              <div className="mb-3">
                <label htmlFor="formUsername" className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="formUsername"
                  name="username"
                  value={updatedUserInfo.username}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formEmail" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="formEmail"
                  name="email"
                  value={updatedUserInfo.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formBio" className="form-label">Bio</label>
                <textarea
                  className="form-control"
                  id="formBio"
                  rows="3"
                  name="bio"
                  value={updatedUserInfo.bio}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              {/* Add a file input for updating the profile picture */}
              <div className="mb-3">
                <label htmlFor="formProfilePicture" className="form-label">Profile Picture</label>
                <input
                  type="file"
                  className="form-control"
                  id="formProfilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={(e) => handleInputChange({ target: { name: 'profilePicture', value: e.target.files[0] } })}
                />
              </div>

              {/* Add a date input for updating the date of birth */}
              <div className="mb-3">
                <label htmlFor="formDateOfBirth" className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  id="formDateOfBirth"
                  name="dateOfBirth"
                  value={updatedUserInfo.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>

              <button type="button" className="btn btn-primary" onClick={handleUpdateProfile}>
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default UpdateProfile;

