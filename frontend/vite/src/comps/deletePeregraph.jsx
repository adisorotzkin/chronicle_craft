import React, { useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import { apiService } from '../service/apisService';
import { useNavigate } from 'react-router-dom';

const DeleteParagraph = () => {
  const token = localStorage.getItem('token');
  const { deleteAuthenticatedData } = apiService();
  const location = useLocation();
  const { paragraph } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const confirmDeletion = window.confirm('Are you sure you want to delete this paragraph?');

    if (confirmDeletion) {
      deleteParagraph();
    } else {
      navigate('/profile')
    }
  }, []);

  const deleteParagraph = async () => {
    try {
      const res = await deleteAuthenticatedData('/paragraphs', paragraph._id, token);
      alert('Paragraph deleted successfully');
      navigate('/profile')
    } catch (error) {
      console.error('Error deleting paragraph:', error);
      alert('Error deleting paragraph');
    }
  };

  return <div></div>;
};

export default DeleteParagraph;
