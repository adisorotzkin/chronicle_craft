import React, { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';
import { apiService } from '../service/apisService';
import axios from 'axios';
import Navbar from '../static_comps/navbar';
import '../comps_css/updateProfile.css';

const UpdateProfile = () => {
  const { userData, setUserData } = useContext(AppContext);
  const userToken = localStorage.getItem('token');
  const navigate = useNavigate();
  const { updateAuthenticatedData } = apiService();

  const usernameRef = useRef();
  const emailRef = useRef();
  const bioRef = useRef();
  const profilePictureRef = useRef();
  const dateOfBirthRef = useRef();

  const uploadImageToCloudinary = async (imageFile, name) => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'cmezl4xo');
      formData.append('public_id', name);

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dfi59gi7h/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Image uploaded successfully to Cloudinary:', response.data);
      return response.data.url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  };

  const handleUpdateProfile = async () => {
    try {
      console.log(profilePictureRef.current.files[0]);
      const urlPromise = uploadImageToCloudinary(profilePictureRef.current.files[0], Date.now())
      const url = await urlPromise;
      const updatedUserInfo = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        bio: bioRef.current.value,
        profilePicture: url,
        dateOfBirth: dateOfBirthRef.current.value
      };


      const updatedData = await updateAuthenticatedData('/users/', userData._id, updatedUserInfo, userToken);

      setUserData(updatedData);

      navigate('/profile');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div className="outer-main-update-profile">
      <Navbar />
      <div className="inner-main-update-profile p-5">
        <h2>Update Your Profile</h2>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <form>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" defaultValue={userData.username} ref={usernameRef} />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" defaultValue={userData.email} ref={emailRef} />
              </div>

              <div className="mb-3">
                <label className="form-label">Bio</label>
                <textarea className="form-control" rows="3" defaultValue={userData.bio} ref={bioRef} ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Profile Picture</label>
                <input type="file" className="form-control" accept="image/*" ref={profilePictureRef} />
              </div>

              <div className="mb-3">
                <label className="form-label">Date of Birth</label>
                <input type="date" className="form-control" defaultValue={userData.dateOfBirth} ref={dateOfBirthRef} />
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
