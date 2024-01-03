import React, { useRef, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiService } from '../service/apisService';
import ImageGenerator from './imageGenerator';
import { AppContext } from '../context/context';

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
  const [cloudImg, setCloudImg] = useState('');

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

    console.log("storyInfo._id: ", storyInfo._id);

    const characterName = characterNameRef.current.value;
    const characterDescription = characterDescriptionRef.current.value;
    try {
      const response = await postAuthenticatedData('/paragraphs', {
        storyId: storyInfo._id,
        name: name,
        content: content,
        end: isLastParagraphRef.current.checked
      }, localStorage.getItem('token'));

      console.log("post response: ",response);
      console.log(`/stories/single/${storyInfo._id}`);

      const storyInfo2 = await getData(`/stories/single/${storyInfo._id}`);
      console.log('Data from API:', storyInfo2.data);

      console.log(storyInfo2.data.paragraphsArr);
      const existingParagraphsArr = Array.isArray(storyInfo2.data.paragraphsArr) ? storyInfo2.data.paragraphsArr : [];

      const updatedParagraphsArr = [...existingParagraphsArr, response._id];

      const response2 = await updateData('/stories', storyInfo._id, {
        title: storyInfo.title,
        description: storyInfo.description,
        genre: storyInfo.genre,
        coverImg: storyInfo.coverImg,
        paragraphsArr: updatedParagraphsArr
      });

      const uploadImageToCloudinary = async (generatedImg, bookCoverName) => {
        try {
          const response = await axios.post(
            'https://api.cloudinary.com/v1_1/dfi59gi7h/image/upload',
            {
              file: generatedImg,
              upload_preset: 'cmezl4xo',
              public_id: bookCoverName,
            }
          );
    
          console.log('Image uploaded successfully to Cloudinary:', response.data);
          // await Promise.all(response)
          return response.data.url;
        } catch (error) {
          console.error('Error uploading image to Cloudinary:', error);
          throw error;
        }
      };

      alert('Paragraph added successfully!');

      if (storyInfo.charactersCtr < 5) {
        const addCharacter = window.confirm('Do you want to add a main character to the story?');

        const urlImgFromCloud =await uploadImageToCloudinary(imageUrl, characterName)
        setCloudImg(urlImgFromCloud);

        if (addCharacter) {
          const response2 = await postAuthenticatedData('/characters', {
            storyId: storyInfo._id,
            characterName: characterName,
            description: characterDescription,
            image: urlImgFromCloud
          }, localStorage.getItem('token'));

          alert('Main character added successfully!');
        }
      }

      // if (isLastParagraphRef) {
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
          <label htmlFor="name" className="form-label">Name:</label>
          <input className="form-control" ref={nameRef} />

          <label htmlFor="content" className="form-label">Content:</label>
          <textarea className="form-control" id="content" ref={contentRef}></textarea>
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="isLastParagraph" ref={isLastParagraphRef} />
            <label className="form-check-label" htmlFor="isLastParagraph">Is this the last paragraph?</label>
          </div>
        </div>
        {storyInfo?.charactersCtr < 5 && (
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



