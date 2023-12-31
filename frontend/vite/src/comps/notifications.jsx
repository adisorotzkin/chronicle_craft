import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../static_comps/navbar';
import { apiService } from '../service/apisService';

const Notifications = () => {
  const userId = localStorage.getItem('uid');
  const [userParagraphs, setUserParagraphs] = useState([]);
  const { getData } = apiService();

  useEffect(() => {
    const fetchUserParagraphs = async () => {
      try {
        if (userId) {
          const response = await getData(`/paragraphs/${userId}`);
          console.log(response);
          setUserParagraphs(response.data || []); 
        }
      } catch (error) {
        console.error('Error fetching user paragraphs:', error);
      }
    };

    fetchUserParagraphs();
  }, [userId, getData]);

  return (
    <div>
      <div>
        <h2>Your Notifications</h2>
        {userParagraphs.length > 0 ? (
          <ul>
            {userParagraphs.map((paragraph) => (
              <li key={paragraph._id}>{paragraph.content}</li>
            ))}
          </ul>
        ) : (
          <p>No paragraphs found for the current user.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;




