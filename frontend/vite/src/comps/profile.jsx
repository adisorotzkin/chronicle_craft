import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../static_comps/navbar';
import { apiService } from '../service/apisService';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';
import StarRating from './starRating';
import '../comps_css/profile.css'
import { useRef } from 'react';

const Profile = () => {
  const token = localStorage.getItem('token');
  const { getData, updateAuthenticatedData } = apiService();
  const [shouldFetchData, setShouldFetchData] = useState(true);
  const [userActivity, setUserActivity] = useState({ stories: [], paragraphs: [] });
  const [userComments, setUserComments] = useState([]);
  const [userCommentsDetails, setUserCommentsDetails] = useState([]);
  const [shouldFetchActivity, setShouldFetchActivity] = useState(true);
  const navigate = useNavigate();
  const { setSelectedBook, userData, setUserData } = useContext(AppContext);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const commentEditRef = useRef();

  const handleEditButtonClick = () => {
    setIsEditFormVisible(!isEditFormVisible);
  };

  const handleDeleteCommentClick = () => {

  };

  const handleStoryClick = () => {
    navigate('/bookItem');
  };

  const handleUpdateDetails = () => {
    navigate('/updateProfile');
  };

  const handleDeleteAccount = () => {
    navigate('/deleteAccount');
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
          console.log(storiesResponse);
          const paragraphsResponse = await getData(`/paragraphs/${currentUserId}`);
          console.log(paragraphsResponse);
          const commentsResponse = await getData(`/comments/userId/${currentUserId}`);
          console.log(commentsResponse);

          setUserActivity({
            stories: storiesResponse.data,
            paragraphs: paragraphsResponse.data,
          });

          setUserComments(commentsResponse.data);
          console.log(userComments);

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

      // const storyResponse = await getData(`/stories/single/${paragraphResponse.data.storyId}`);
      // console.log(storyResponse.data);

      return {
        content: comment.content,
        paragraphName: paragraphResponse.data.name,
        commentId: comment._id
        // storyTitle: storyResponse.title,
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
    <div className="outer-main-profile">
      <Navbar />
      <div className="container inner-main-profile p-5">
        {userData ? (
          <div>
            <div className="row mb-5">
              <div className="col-3 d-flex align-items-center">
                <img src={userData.profilePicture} className="profile-img" alt="Profile" />
              </div>
              <div className="col-8 p-3">
                <div className="username-rating d-flex">
                  <h2 className='me-4 d-flex align-items-center'>{userData.username}</h2>
                  {console.log('user data:', userData)}
                  <p><StarRating averageRating={userData.rating} /></p>
                </div>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Bio:</strong> {userData.bio}</p>
                <p><strong>Active:</strong> {userData.active ? 'Yes' : 'No'}</p>
              </div>
              <div className="buttons col-1">
                <button onClick={handleUpdateDetails} className="btn btn-dark me-3 mb-2" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Delete account"><i class="fa fa-list text-white" aria-hidden="true"></i></button>
                <button onClick={handleDeleteAccount} className="btn btn-danger"><i class="fa fa-trash text-white" aria-hidden="true"></i></button>
              </div>
            </div>

            <h1 className="mb-4">Activity</h1>
            <div className="activity">
              <div className="mb-5 w-75">
                <h3>Written Stories</h3>
                <ul className="list-group">
                  {userActivity.stories.map((story) => (
                    <li className="list-group-item row" key={story.id}>
                      <div className="para-name col-4">
                        {story.title}
                      </div>
                      <div className='buttons-profile col-8'>
                        <button onClick={handleStoryClick} className="btn">View</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-5 w-75">
                <h3>Written Paragraphs</h3>
                <ul className="list-group">
                  {userActivity.paragraphs.map((paragraph) => (
                    <li className="list-group-item row" key={paragraph.id}>
                      <div className="para-name col-4">
                        {paragraph.name}
                      </div>
                      <div className="buttons-profile col-8">
                        {paragraph.end && (
                          <>
                            <button onClick={() => { navigate('/editParagraph', { state: { paragraph: paragraph } }); }} className="btn border mx-2"> Edit</button>
                            <button onClick={() => { navigate('/deletePeregraph', { state: { paragraph: paragraph } }) }} className="btn border ">Delete </button>
                          </>
                        )}
                        {paragraph.end == false && (
                          <div className="d-flex align-item-center ">
                            <p className='text-black-50 me-4'>Unable to edit</p>
                          </div>
                        )}

                        <button onClick={async () => {
                          const response = await getData(`/stories/single/${paragraph.storyId}`);
                          setSelectedBook(response.data);
                          navigate('/bookItem');
                        }} className="btn border">View</button>
                      </div>

                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="your-comments w-75">
              <h3 className="mt-4">Your Comments</h3>
              <ul className="list-group">
                {userCommentsDetails.map((details, index) => (
                  <li className="list-group-item" key={index}>
                    <>
                      {details ? (
                        <>
                          <p className="h5">{details.content}</p>
                          <p className="text-muted">Paragraph Name: {details.paragraphName}</p>
                          {/* <p className="text-muted">Story Title: {details.storyTitle}</p> */}
                          <button onClick={handleEditButtonClick} className="btn border mx-2"> Edit</button>
                          {isEditFormVisible && (
                            <div className="edit-form">
                              <textarea ref={commentEditRef} defaultValue={details.content} />
                              <button
                                onClick={async () => {
                                  const updatedContent = commentEditRef.current.value;
                                  console.log('Comment ID:', details.commentId);

                                  const resComment = await updateAuthenticatedData('/comments', details.commentId, { content: updatedContent }, token);
                                  console.log(resComment);
                                  setIsEditFormVisible(!isEditFormVisible)
                                  navigate('/commentEdited');
                                }}
                                className='btn border'> Save </button>
                            </div>
                          )}
                          <button onClick={() => {
                            navigate('/deleteComment', { state: { commentId: details.commentId } });
                          }} className="btn border mx-2">Delete</button>
                        </>

                      ) : (
                        <p>Error fetching details for comment</p>
                      )}
                    </>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  )
}

export default Profile;









