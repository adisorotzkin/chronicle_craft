// Notifications.jsx
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../static_comps/navbar';
import { apiService } from '../service/apisService';
import StarRating from './starRating';

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
          const averageRating = calculateAverageRating(ratingResponse.data);
          setUserRating(averageRating);

          // Fetch comments for each paragraph
          const commentsPromises = paragraphsResponse.data.map(async (paragraph) => {
            const commentsResponse = await getData(`/comments/paragraphId/${paragraph._id}`);
            return {
              paragraphName: paragraph.content,
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
    <div className="container mt-5">
      <div className="mb-4">
        <h2 className="text-dark">Your Rating</h2>
        {userRating ? (
          <>
            <p className="text-success">Your average rating:</p>
            <StarRating averageRating={userRating} />
          </>
        ) : (
          <p className="text-danger">No rating found for the current user.</p>
        )}
      </div>

      <div>
        <h2 className="text-dark">Your Paragraph's Comments</h2>
        {userComments.length > 0 ? (
          <div>
            {userComments.map((item, index) => (
              // Check if the paragraph has comments
              item.comments.length > 0 && (
                <div key={index}>
                  <h3>{item.paragraphName}</h3>
                  <ul>
                    {item.comments.map((comment) => (
                      <li key={comment._id}>{comment.content}</li>
                    ))}
                  </ul>
                </div>
              )
            ))}
          </div>
        ) : (
          <p className="text-warning">No paragraphs found for the current user.</p>
        )}
      </div>


    </div>
  );
};

export default Notifications;
