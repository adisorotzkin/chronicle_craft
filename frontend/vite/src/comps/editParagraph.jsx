import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { apiService } from '../service/apisService';
import { useNavigate } from 'react-router-dom';

const EditParagraph = () => {
  const token = localStorage.getItem('token');
  const {  updateAuthenticatedData } = apiService();
  const location = useLocation();
  const { paragraph: paragraph } = location.state || {};
  const navigate = useNavigate();

  

  const textAreaRef = useRef();
  const inputRef = useRef();

  const handleUpdateParagraph = async () => {
    try {
      const editedParagraph = {
        name: inputRef.current.value ,
        content: textAreaRef.current.value
      };
      const updatedParagraph = await updateAuthenticatedData( '/paragraphs',paragraph._id, editedParagraph, token);
      console.log(updatedParagraph);
      navigate('/profile');
    } catch (error) {
      console.error('Error updating paragraph:', error);
    }
  };

  useEffect(() => {
  }, []);

  return (
    <div>
      <h1>Edit Paragraph</h1>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" defaultValue={paragraph.name}
            ref={inputRef}/>
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea className="form-control" defaultValue={paragraph.content}
            ref={textAreaRef}/>
        </div>
        <button type="button" className="btn border" onClick={handleUpdateParagraph}>Save</button>
      </form>
    </div>
  );
};

export default EditParagraph;
