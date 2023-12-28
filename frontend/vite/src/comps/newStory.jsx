import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../service/apisService';
import ImageGenerator from './imageGenerator'
import { AppContext } from '../context/context';


const NewStory = () => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const genreRef = useRef(null);
  const navigate = useNavigate();
  const { postAuthenticatedData } = apiService();
  const { imageUrl, setImageUrl } = useContext(AppContext);




  const handleNext = async () => {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const genre = genreRef.current.value;

    if (title.trim() === '' || description.trim() === '' || genre.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }



    try {
      const response = await postAuthenticatedData('/stories', {
        title: title,
        description: description,
        genre: genre,
        coverImg: imageUrl
      }, localStorage.getItem('token'));

        console.log("Story created successfully!" , response);
        navigate('/newParagraph', {state: {storyInfo: response.story }});
     
      
    } catch (error) {
      console.error('Error creating story:', error);
      alert('An error occurred while creating the story. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Create a New Story</h2>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" ref={descriptionRef} />
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <input type="text" id="genre" ref={genreRef} />
        </div>
        <ImageGenerator />
        <button type="button" onClick={handleNext}> Next </button>
      </form>
    </div>
  );
};

export default NewStory;


