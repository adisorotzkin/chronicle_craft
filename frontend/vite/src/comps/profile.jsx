import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import Navbar from '../static_comps/navbar';
import { apiService } from '../service/apisService';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';

const Profile = () => {
  const { getData, updateAuthenticatedData } = apiService();
  // const [] = useState(null);
  const [shouldFetchData, setShouldFetchData] = useState(true);
  const [userActivity, setUserActivity] = useState({ stories: [], paragraphs: [] });
  const [userComments, setUserComments] = useState([]);
  const [userCommentsDetails, setUserCommentsDetails] = useState([]);
  const [shouldFetchActivity, setShouldFetchActivity] = useState(true);
  const navigate = useNavigate();
  const { setSelectedBook ,userData, setUserData} = useContext(AppContext);
  

  const handleStoryClick = () => {
    navigate('/bookItem');
  };

  const handleUpdetaDetails = () => {
    navigate('/updateProfile');
  };

  const handleDeleteAccount = () => {

  };

  useEffect(() => {
    const currentUserId = localStorage.getItem('uid');

    const fetchUserData = async () => {
      try {
        if (shouldFetchData) {
          const response = await getData(`/users/singleId/${currentUserId}`);
          setUserData(response.data);
          setShouldFetchData(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchUserActivity = async () => {
      try {
        if (shouldFetchActivity) {
          const storiesResponse = await getData(`/stories/author/${currentUserId}`);
          const paragraphsResponse = await getData(`/paragraphs/${currentUserId}`);
          const commentsResponse = await getData(`/comments/userId/${currentUserId}`);

          setUserActivity({
            stories: storiesResponse.data,
            paragraphs: paragraphsResponse.data,
          });

          setUserComments(commentsResponse.data);

          setShouldFetchActivity(false);
        }
      } catch (error) {
        console.error('Error fetching user activity:', error);
      }
    };

    fetchUserData();
    fetchUserActivity();
  }, [getData, shouldFetchData, shouldFetchActivity]);

  const fetchParagraphAndStory = async (comment) => {
    try {
      const paragraphResponse = await getData(`/paragraphs/single/${comment.paragraphId}`);
      const storyResponse = await getData(`/stories/single/${paragraphResponse.data.storyId}`);

      return {
        content: comment.content,
        paragraphName: paragraphResponse.data.name,
        storyTitle: storyResponse.data.title,
      };
    } catch (error) {
      console.error('Error fetching paragraph and story:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCommentDetails = async () => {
      const detailsPromises = userComments.map(async (comment) => {
        const details = await fetchParagraphAndStory(comment);
        return details;
      });

      const commentDetails = await Promise.all(detailsPromises);
      setUserCommentsDetails(commentDetails);
    };

    fetchCommentDetails();
  }, [userComments]);

  return (
    <div>
      {/* Navbar */}

      <Container className="profile-container mt-5">
        {userData ? (
          <>
            <Row className="mb-3">
              <Col xs={12} md={4}>
                <Image src={userData.profilePicture} fluid rounded />
              </Col>
              <Col xs={12} md={8}>
                <h2>{userData.username}</h2>
                <p>Email: {userData.email}</p>
                <p>Bio: {userData.bio}</p>
                <p>Active: {userData.active ? 'Yes' : 'No'}</p>
                <p>Rating: {userData.rating}</p>
                <button onClick={handleUpdetaDetails} className='btn btn-dark'>Updete details</button> <button onClick={handleDeleteAccount} className='btn btn-danger'>Delete your account</button>
              </Col>
            </Row>

            <h1 className='mb-4'>Activity</h1>
            <Row>
              <Col>
                <h3>Written Stories</h3>
                <ListGroup>
                  {userActivity.stories.map((story) => (
                    <ListGroup.Item onClick={handleStoryClick} key={story.id}>{story.title}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col>
                <h3>Written Paragraphs</h3>
                <ListGroup>
                  {userActivity.paragraphs.map((paragraph) => (
                    <ListGroup.Item onClick={async () => {
                      const response = await getData(`/stories/single/${paragraph.storyId}`);
                      setSelectedBook(response.data);
                      navigate('/bookItem');
                    }} key={paragraph.id}>{paragraph.name}</ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>

            <h3 className="mt-4">Your Comments</h3>
            <ListGroup>
              {userCommentsDetails.map((details, index) => (
                <ListGroup.Item key={index}>
                  {details ? (
                    <>
                      <p className="h5">{details.content}</p>
                      <p className="text-muted">Paragraph Name: {details.paragraphName}</p>
                      <p className="text-muted">Story Title: {details.storyTitle}</p>
                    </>
                  ) : (
                    <p>Error fetching details for comment</p>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </Container>
    </div>
  );
};

export default Profile;







