import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../service/apisService';
import ImageGenerator from './imageGenerator';
import { AppContext } from '../context/context';
import '../comps_css/newStory.css';
import Navbar from '../static_comps/navbar';
import axios from 'axios';
import { storage } from '../../config/firebaseConfig';

const NewStory = () => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const genreRef = useRef(null);
  const navigate = useNavigate();
  const { postAuthenticatedData } = apiService();
  const { imageUrl, genresArray } = useContext(AppContext);

  // const uploadImageToFirebase = async (imageUrl, storagePath) => {
  //   try {
  //     const response = await axios({
  //       method: 'get',
  //       url: imageUrl,
  //       responseType: 'arraybuffer', // Set the responseType to 'arraybuffer'
  //     });

  //     const buffer = Buffer.from(response.data, 'binary'); // Convert arraybuffer to Buffer

  //     const bucket = storage.bucket();
  //     const file = bucket.file(storagePath);

  //     await file.save(buffer, {
  //       metadata: {
  //         contentType: 'image/jpeg',
  //       },
  //     });

  //     console.log('Image uploaded to Firebase Storage successfully.');
  //   } catch (error) {
  //     console.error('Error uploading image to Firebase Storage:', error);
  //     throw error;
  //   }
  // };

  const handleNext = async () => {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const genre = genreRef.current.value;

    if (title.trim() === '' || description.trim() === '' || genre.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }

    // const storagePath = `images/${title.toLowerCase().replace(/ /g, '_')}.jpg`;

    // await uploadImageToFirebase(imageUrl, storagePath);

    // const firebaseImageUrl = `https://storage.googleapis.com/${storage.bucket().name}/${encodeURIComponent(storagePath)}`;

    try {
      const response = await postAuthenticatedData('/stories', {
        title: title,
        description: description,
        genre: genre,
        coverImg: imageUrl,
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
            <select id="genre" className="form-control mb-2" ref={genreRef}>
              <option value="" disabled selected>Select your genre</option>
              {genresArray.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <ImageGenerator />
          <div className="btn-next-div mb-4">
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


