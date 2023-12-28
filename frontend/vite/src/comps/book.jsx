import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../context/context';
import { apiService } from '../service/apisService';

const Book = () => {
  const { extParagraphsContentArr, paragraphsIdArr } = useContext(AppContext);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [shouldFetchData, setShouldFetchData] = useState(true);
  const { getData, postAuthenticatedData } = apiService();
  const inputRef = useRef(null);

  useEffect(() => {
    console.log('Fetching data...');

    const fetchData = async () => {
      try {
        if (
          shouldFetchData &&
          extParagraphsContentArr &&
          extParagraphsContentArr[currentParagraphIndex] &&
          extParagraphsContentArr[currentParagraphIndex].data &&
          extParagraphsContentArr[currentParagraphIndex].data.author
        ) {
          const profile = await getData(`/users/single/${extParagraphsContentArr[currentParagraphIndex].data.author}`);
          const comments = await getData(`/comments/paragraphId/${extParagraphsContentArr[currentParagraphIndex].data._id}`);
          console.log('comments:', comments);
          console.log('Data from API:', profile.data);
          setCommentData(comments.data);
          setProfileData(profile.data);
          setShouldFetchData(false);
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
    setShouldFetchData(true);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const commentValue = inputRef.current.value;
    const commentDetails = {
      paragraphId: paragraphsIdArr[currentParagraphIndex],
      content: commentValue,
    };

    try {
      if (commentDetails) {
        await postAuthenticatedData('/comments', commentDetails, localStorage.getItem('token'));
        console.log('Comment submitted:', commentDetails.content);

        const comments = await getData(`/comments/paragraphId/${extParagraphsContentArr[currentParagraphIndex].data._id}`);
        setCommentData(comments.data);
      }
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

          <h2>Comments:</h2>
          {commentData && commentData.map((comment) => (
            <p key={comment._id}># content: {comment.content} </p>
          ))}

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










