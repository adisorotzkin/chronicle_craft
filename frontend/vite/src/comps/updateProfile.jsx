import React, { useRef, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';
import { apiService } from '../service/apisService';
import axios from 'axios';

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
        dateOfBirth: dateOfBirthRef.current.value,
        registrationDate: userData.registrationDate
      };


      const updatedData = await updateAuthenticatedData('/users/',userData._id, updatedUserInfo, userToken);

      setUserData(updatedData);

      navigate('/profile');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <Container className="update-profile-container mt-5">
      <h2>Update Your Profile</h2>
      <Row>
        <Col xs={12} md={6}>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" ref={usernameRef} defaultValue={userData.username} />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} defaultValue={userData.email} />
            </Form.Group>

            <Form.Group controlId="formBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" rows={3} ref={bioRef} defaultValue={userData.bio} />
            </Form.Group>

            <Form.Group controlId="formProfilePicture">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" ref={profilePictureRef} accept="image/*" />
            </Form.Group>

            <Form.Group controlId="formDateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" ref={dateOfBirthRef} defaultValue={userData.dateOfBirth} />
            </Form.Group>

            <Button variant="primary" onClick={handleUpdateProfile}>
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProfile;
