import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../context/context';
import { apiService } from '../service/apisService';
import Submitcomment from './submitcomment';
import { useNavigate } from 'react-router-dom';

const Book = () => {
  const { extParagraphsContentArr, paragraphsIdArr } = useContext(AppContext);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [shouldFetchData, setShouldFetchData] = useState(true); // New boolean state
  const { getData, postAuthenticatedData } = apiService();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Fetching data...');

    const fetchData = async () => {
      try {
        if (
          shouldFetchData && // Check the boolean condition
          extParagraphsContentArr &&
          extParagraphsContentArr[currentParagraphIndex] &&
          extParagraphsContentArr[currentParagraphIndex].data &&
          extParagraphsContentArr[currentParagraphIndex].data.author
        ) {
          const profile = await getData(`/users/single/${extParagraphsContentArr[currentParagraphIndex].data.author}`);
          console.log('Data from API:', profile.data);
          setProfileData(profile.data);
          setShouldFetchData(false); // Set it to false after successful fetch
        } else {
          console.warn('Author information not available for the current paragraph.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [extParagraphsContentArr, currentParagraphIndex, getData, shouldFetchData]);

  const handleNextParagraph = () => {
    setCurrentParagraphIndex((prevIndex) => prevIndex + 1);
    setShouldFetchData(true); // Reset the boolean when moving to the next paragraph
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const commentValue = inputRef.current.value;
    const commentDetails = {
      paragraphId: paragraphsIdArr[currentParagraphIndex],
      content: commentValue,
    };
    navigate('/submitcomment', { state: { commentDetails } });
  };

  return (
    <div className="container">
      <p>paragraph {currentParagraphIndex + 1}:</p>
      <p>{extParagraphsContentArr[currentParagraphIndex]?.data.content}</p>
      <button onClick={handleNextParagraph}>Next Paragraph</button>

      {profileData && (
        <>
          <p>Author: {profileData.username}</p>
          <img src={profileData.profilePicture} alt="Profile" />
          <p>bio: {profileData.bio} </p>
          <p>rating: {profileData.rating}</p>

          <form onSubmit={handleCommentSubmit}>
            <label htmlFor="comment">Add a Comment:</label>
            <input ref={inputRef} type="text" id="comment" name="comment" />
            <button type="submit">Submit Comment</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Book;









