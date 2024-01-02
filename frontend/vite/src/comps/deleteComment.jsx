import React, { useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import { apiService } from '../service/apisService';
import { useNavigate } from 'react-router-dom';

const DeleteComment = () => {
  const token = localStorage.getItem('token');
  const { deleteAuthenticatedData } = apiService();
  const location = useLocation();
  const { commentId } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = 'black';

    const confirmDeletion = window.confirm('Are you sure you want to delete this comment?');

    if (confirmDeletion) {
      deleteComment();
    } else {
      navigate('/profile')
    }
  }, []);

  const deleteComment = async () => {
    try {
      const res = await deleteAuthenticatedData('/comments', commentId, token);
      alert('comment deleted successfully');
      navigate('/profile')
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Error deleting comment');
    }
  };

  return <div></div>;
};

export default DeleteComment;