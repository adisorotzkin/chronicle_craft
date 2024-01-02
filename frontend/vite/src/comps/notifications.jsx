// Notifications.jsx
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../static_comps/navbar';
import { apiService } from '../service/apisService';
import StarRating from './starRating';
import '../comps_css/notifications.css'

const Notifications = () => {
  const userId = localStorage.getItem('uid');
  const [userParagraphs, setUserParagraphs] = useState([]);
  const [userRating, setUserRating] = useState(null);
  const [userComments, setUserComments] = useState([]);
  const [apiRequestsCompleted, setApiRequestsCompleted] = useState(false);
  const { getData } = apiService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId && !apiRequestsCompleted) {
          // Fetch paragraphs
          const paragraphsResponse = await getData(`/paragraphs/${userId}`);
          setUserParagraphs(paragraphsResponse.data || []);

          // Fetch ratings
          const ratingResponse = await getData(`/ratings/${userId}`);
          console.log('ratingsResponse: ', ratingResponse);
          const userData = await getData(`/users/singleId/${userId}`);
          console.log('userData notifications: ', userData);
          const averageRating = calculateAverageRating(ratingResponse.data);
          setUserRating(averageRating);

          // Fetch comments for each paragraph
          const commentsPromises = paragraphsResponse.data.map(async (paragraph) => {
            const commentsResponse = await getData(`/comments/paragraphId/${paragraph._id}`);
            return {
              paragraphName: paragraph.name,
              comments: commentsResponse.data,
            };
          });

          // Wait for all comments requests to complete
          const allComments = await Promise.all(commentsPromises);
          setUserComments(allComments);

          setApiRequestsCompleted(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const calculateAverageRating = (ratings) => {
      if (!ratings || ratings.length === 0) {
        return null;
      }

      const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
      const average = sum / ratings.length;
      return average;
    };

    fetchData();
  }, [userId, getData, apiRequestsCompleted]);

  return (
    <div className="outer-main-notifications">
      <Navbar />
      <div className="inner-main-notifications container p-5">
        <h1>Notifications:</h1>
        <div className="rating-stars mb-5 mt-5 p-3">
          <h3 className="">Your current average rating:</h3>
          {userRating ? (
            <div>
              <StarRating averageRating={userRating} />
            </div>
          ) : (
            <p className="text-danger">No rating found for the current user.</p>
          )}
        </div>

        <div>
          <h3 className="mb-4 mt-5">Your Paragraphs Comments:</h3>
          {userComments.length > 0 ? (
            <div className='p-3'>
              {userComments.map((item, index) => (
                item.comments.length > 0 && (
                  <div key={index} className='paragraphs-comments-item bg-dark p-4'>
                    <h4 className='mb-4'>{item.paragraphName} :</h4>
                    {item.comments.map((comment) => (
                      <div className="comment row mb-4" key={comment._id}>
                        <img className='profile-img col-1 me-3' src={"/"} alt="Profile" />
                        <div className="comment-inner col-10">
                          <div className="comment-inner-inner d-flex">
                            <p className='comment-uid fw-bold me-2'>@{comment.userId}</p>
                            <p className='comment-date'>{comment.dateCreated && comment.dateCreated.substring(0, 10)}</p>
                          </div>
                          <p className=''>{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ))}
            </div>
          ) : (
            <p className="text-warning">No paragraphs found for the current user.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
