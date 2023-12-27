import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../context/context';
import { apiService } from '../service/apisService';


const Book = () => {
  const { extParagraphsContentArr ,paragraphsIdArr} = useContext(AppContext);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const { getData, postData } = apiService();
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          extParagraphsContentArr &&
          extParagraphsContentArr[currentParagraphIndex] &&
          extParagraphsContentArr[currentParagraphIndex].data &&
          extParagraphsContentArr[currentParagraphIndex].data.author
        ) {
          const profile = await getData(`/users/single/${extParagraphsContentArr[currentParagraphIndex].data.author}`);
          console.log('Data from API:', profile.data);
          setProfileData(profile.data); // Update profile data
        } else {
          console.warn('Author information not available for the current paragraph.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [extParagraphsContentArr, currentParagraphIndex, getData]);

  const handleNextParagraph = () => {
    setCurrentParagraphIndex((prevIndex) => prevIndex + 1);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const commentValue = inputRef.current.value;
    const commentDetails = {
      paragraphId: paragraphsIdArr[currentParagraphIndex],
      content: commentValue
    }
    try {
      await postData('/comments', commentDetails);
      console.log('Comment submitted:', commentValue);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
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








