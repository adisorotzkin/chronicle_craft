import React, { useRef, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiService } from '../service/apisService';
import ImageGenerator from './imageGenerator';
import { AppContext } from '../context/context';
import axios from 'axios';
import Navbar from '../static_comps/navbar';
import '../comps_css/newParagraph.css';

const NewParagraph = () => {
  const contentRef = useRef(null);
  const isLastParagraphRef = useRef(null);
  const nameRef = useRef(null);
  const characterNameRef = useRef(null);
  const characterDescriptionRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { postAuthenticatedData, updateData, getData } = apiService();
  const { storyInfo } = location.state || {};
  const { imageUrl, setImageUrl } = useContext(AppContext);
  const [addCharacter, setAddCharacter] = useState(false);

  const uploadImageToCloudinary = async () => {
    console.log('imageUrl: ', imageUrl);
    console.log('characterameRef: ', characterNameRef.current.value);
    try {
      const formData = new FormData();
      formData.append('file', imageUrl);
      formData.append('upload_preset', 'cmezl4xo');
      formData.append('public_id', characterNameRef.current.value);

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dfi59gi7h/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Image uploaded successfully to Cloudinary:', response.data);
      return response.data.url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  };

  const handleAdd = async () => {
    const name = nameRef.current.value;
    const content = contentRef.current.value;

    if (name.trim() === '') {
      alert('Please enter paragraph name.');
      return;
    }
    if (content.trim() === '') {
      alert('Please enter paragraph content.');
      return;
    }

    try {
      const response = await postAuthenticatedData('/paragraphs', {
        storyId: storyInfo._id,
        name: name,
        content: content,
        end: isLastParagraphRef.current.checked
      }, localStorage.getItem('token'));

      const storyInfo2 = await getData(`/stories/single/${storyInfo._id}`);
      const existingParagraphsArr = Array.isArray(storyInfo2.data.paragraphsArr) ? storyInfo2.data.paragraphsArr : [];
      const updatedParagraphsArr = [...existingParagraphsArr, response._id];

      if (addCharacter) {
        const urlImgFromCloud = await uploadImageToCloudinary();

        const response2 = await postAuthenticatedData('/characters', {
          storyId: storyInfo._id,
          characterName: characterNameRef.current.value,
          description: characterDescriptionRef.current.value,
          image: urlImgFromCloud
        }, localStorage.getItem('token'));

        alert('Character added successfully!');

        // Update characters count and paragraphs array
        const response3 = await updateData('/stories/', storyInfo._id, {
          charactersCtr: storyInfo.charactersCtr + 1,
          paragraphsArr: updatedParagraphsArr
        });
      }

      else {
        const response3 = await updateData('/stories/', storyInfo._id, {
          charactersCtr: storyInfo.charactersCtr,
          paragraphsArr: updatedParagraphsArr
        });
        console.log(response3);

      }
      setImageUrl('');
      navigate('/bookItem');
      alert('Paragraph added successfully!');
    } catch (error) {
      console.error('Error adding paragraph:', error);
      alert('An error occurred while adding the paragraph. Please try again.');
    }
  };

  const handleAddCharacter = () => {
    setAddCharacter(!addCharacter);
  };

  return (
    <div className="outer-main-para">
      <Navbar />
      <div className="inner-main-para p-5">
        <h2>Add a New Paragraph:</h2>
        <form>
          <div className="mb-3 mt-4">
            <label htmlFor="name" className="form-label">Name:</label>
            <input className="form-control mb-3" ref={nameRef} />

            <label htmlFor="content" className="form-label">Content:</label>
            <textarea className="form-control para-text-area" rows='5' id="content" ref={contentRef}></textarea>
          </div>
          <div className="mb-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="isLastParagraph" ref={isLastParagraphRef} />
              <label className="form-check-label" htmlFor="isLastParagraph">Is this the last paragraph?</label>
            </div>
          </div>
          {storyInfo.charactersCtr < 5 && (
            <div>
              <button type="button" className='btn border text-white my-4' onClick={handleAddCharacter}>Add character</button>
              {addCharacter && (
                <div className="add-character">
                  <div className="mb-3">
                    <label htmlFor="characterName" className="form-label">Character Name:</label>
                    <input type="text" className="form-control" id="characterName" ref={characterNameRef} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="characterDescription" className="form-label">Character Description:</label>
                    <textarea className="form-control" id="characterDescription" ref={characterDescriptionRef}></textarea>
                  </div>
                  <ImageGenerator />
                </div>
              )}
            </div>
          )}
          <div className="btn-div pe-2">
            <button type="button" className='btn btn-add fw-bold fs-4' onClick={handleAdd}>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewParagraph;




