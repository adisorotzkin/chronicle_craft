import React, { useRef, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiService } from '../service/apisService';
import ImageGenerator from './imageGenerator';
import { AppContext } from '../context/context';

const NewParagraph = () => {
  const contentRef = useRef(null);
  const isLastParagraphRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { postAuthenticatedData } = apiService();
  const { storyInfo } = location.state || {};
  const { imageUrl, setImageUrl } = useContext(AppContext);

  const handleNext = async () => {
    const content = contentRef.current.value;
    const isLastParagraph = isLastParagraphRef.current.checked;

    if (content.trim() === '') {
      alert('Please enter paragraph content.');
      return;
    }

    try {
      const response = await postAuthenticatedData('/paragraphs', {
        storyId: storyInfo._id,
        content: content,
        isLastParagraph: isLastParagraph,
      }, localStorage.getItem('token'));

      alert('Paragraph added successfully!');

      if (isLastParagraph) {
        navigate('/thank-you');
      } else {
        navigate('/new-paragraph', { state: { storyInfo } });
      }
    } catch (error) {
      console.error('Error adding paragraph:', error);
      alert('An error occurred while adding the paragraph. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Add a New Paragraph</h2>
      <form>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea id="content" ref={contentRef} />
        </div>
        <div>
          <label htmlFor="isLastParagraph">Is this the last paragraph?</label>
          <input type="checkbox" id="isLastParagraph" ref={isLastParagraphRef} />
        </div>
        <ImageGenerator />
        <button type="button" onClick={handleNext}> Next </button>
      </form>
    </div>
  );
};

export default NewParagraph;

