// Import necessary dependencies and components
import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';
import { apiService } from '../service/apisService';

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
    <Container className="update-profile-container mt-5">
      <h2>Update Your Profile</h2>
      <Row>
        <Col xs={12} md={6}>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={updatedUserInfo.username}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={updatedUserInfo.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="bio"
                value={updatedUserInfo.bio}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* Add a file input for updating the profile picture */}
            <Form.Group controlId="formProfilePicture">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={(e) => handleInputChange({ target: { name: 'profilePicture', value: e.target.files[0] } })}
              />
            </Form.Group>

            {/* Add a date input for updating the date of birth */}
            <Form.Group controlId="formDateOfBirth">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={updatedUserInfo.dateOfBirth}
                onChange={handleInputChange}
              />
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

