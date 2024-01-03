import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CommentEdited = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = 'black';

    alert('Comment saved successfully');

    navigate('/profile');
  }, []);

  return <div></div>;
};

export default CommentEdited;
