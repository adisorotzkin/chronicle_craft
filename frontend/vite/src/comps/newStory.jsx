import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../service/apisService';
import ImageGenerator from './imageGenerator'
import { AppContext } from '../context/context';
import '../comps_css/newStory.css'
import Navbar from '../static_comps/navbar'


const NewStory = () => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const genreRef = useRef(null);
  const navigate = useNavigate();
  const { postAuthenticatedData } = apiService();
  const { imageUrl, setImageUrl, genresArray } = useContext(AppContext);

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
        console.log(response);
        navigate('/newParagraph', {state: {storyInfo: response }});
     
      
    } catch (error) {
      console.error('Error creating story:', error);
      alert('An error occurred while creating the story. Please try again.');
    }
  };

  return (
    <div className="outer-main-create">
      <Navbar />
      <div className="container inner-main-create">
        <h2>Create a New Story</h2>
        <form className='form'>
          <div className='form-group'>
            <label htmlFor="title">Title *</label>
            <input type="text" className='form-control' id="title" ref={titleRef} />
          </div>
          <div className='form-group'>
            <label htmlFor="description">Description *</label>
            <textarea id="description" className='form-control' ref={descriptionRef} />
          </div>
          <div className='form-group'>
            <label htmlFor="genre">Genre *</label>
            <select id="genre" className="form-control" ref={genreRef}>
              <option value="" disabled selected>Select your genre</option>
              {genresArray.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <ImageGenerator />
          <div className="btn-next-div">
            <button type="button" className="btn text-white" onClick={handleNext}><i className="fa fa-arrow-right btn-next" aria-hidden="true"></i></button>
          </div>
        </form>
        <div className="required-fields">
          <p>* Required fields</p>
        </div>
      </div>
    </div>
  );
};

export default NewStory;


