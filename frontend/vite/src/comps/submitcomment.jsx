import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { apiService } from '../service/apisService';

const Submitcomment = () => {
  const location = useLocation();
  const { commentDetails } = location.state || {};
  const { postAuthenticatedData } = apiService();

  useEffect(() => {
    const submitComment = async () => {
      try {
        if (commentDetails) {
          await postAuthenticatedData('/comments', commentDetails, localStorage.getItem('token'));
          console.log('Comment submitted:', commentDetails.content);
        }
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    };

    submitComment();
  }, [commentDetails, postAuthenticatedData]);

  return (
    <div>
    </div>
  );
};

export default Submitcomment;
