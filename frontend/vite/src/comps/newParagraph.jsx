import React, { useRef, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiService } from '../service/apisService';
import ImageGenerator from './imageGenerator';
import { AppContext } from '../context/context';

const NewParagraph = () => {
  const contentRef = useRef(null);
  const isLastParagraphRef = useRef(null);
  const characterNameRef = useRef(null);
  const characterDescriptionRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { postAuthenticatedData } = apiService();
  const { storyInfo } = location.state || {};
  const { imageUrl, setImageUrl } = useContext(AppContext);

  const handleAdd = async () => {
    const content = contentRef.current.value;
    const isLastParagraph = isLastParagraphRef.current.checked;

    if (content.trim() === '') {
      alert('Please enter paragraph content.');
      return;
    }

    const characterName = characterNameRef.current.value;
    const characterDescription = characterDescriptionRef.current.value;

    try {
      const response = await postAuthenticatedData('/paragraphs', {
        storyId: storyInfo._id,
        content: content,
        end: isLastParagraph
      }, localStorage.getItem('token'));

      alert('Paragraph added successfully!');

      if (storyInfo.charactersCtr < 5) {
        const addCharacter = window.confirm('Do you want to add a main character to the story?');

        if (addCharacter) {
          const response2 = await postAuthenticatedData('/characters', {
            storyId: storyInfo._id,
            characterName: characterName,
            description: characterDescription,
            image: imageUrl
          }, localStorage.getItem('token'));

          alert('Main character added successfully!');
        }
      }

      // if (isLastParagraph) {
      //   navigate('/thank-you');
      // } else {
      //   navigate('/new-paragraph', { state: { storyInfo } });
      // }
    } catch (error) {
      console.error('Error adding paragraph:', error);
      alert('An error occurred while adding the paragraph. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add a New Paragraph</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content:</label>
          <textarea className="form-control" id="content" ref={contentRef}></textarea>
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="isLastParagraph" ref={isLastParagraphRef} />
            <label className="form-check-label" htmlFor="isLastParagraph">Is this the last paragraph?</label>
          </div>
        </div>
        {storyInfo.charactersCtr < 5 && (
          <div>
            <h4>Add a New Main Character to This Story</h4>
            <div className="mb-3">
              <label htmlFor="characterName" className="form-label">Character Name:</label>
              <input type="text" className="form-control" id="characterName" ref={characterNameRef} />
            </div>
            <div className="mb-3">
              <label htmlFor="characterDescription" className="form-label">Character Description:</label>
              <textarea className="form-control" id="characterDescription" ref={characterDescriptionRef}></textarea>
            </div>
          </div>
        )}
        <ImageGenerator />
        <button type="button" onClick={handleAdd}>Add</button>
      </form>
    </div>
  );
};

export default NewParagraph;



