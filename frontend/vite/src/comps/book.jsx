import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../context/context';
import { apiService } from '../service/apisService';
import Navbar from '../static_comps/navbar'
import '../comps_css/book.css'

const Book = () => {
  const { extParagraphsContentArr, paragraphsIdArr, selectedBook } = useContext(AppContext);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [shouldFetchData, setShouldFetchData] = useState(true);
  const [firstColumn, setFirstColumn] = useState('');
  const [secondColumn, setSecondColumn] = useState('');
  const { getData, postAuthenticatedData } = apiService();
  const [addComment, setAddComment] = useState(false);
  const [profileImg, setProfileImg] = useState('');
  const [commentUid, setCommentUid] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
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
          const content = extParagraphsContentArr[currentParagraphIndex]?.data.content || '';
          const wordsArray = content.split(' ');
          const midpointIndex = Math.ceil(wordsArray.length / 2);
          setFirstColumn(wordsArray.slice(0, midpointIndex).join(' '));
          setSecondColumn(wordsArray.slice(midpointIndex).join(' '));

          console.log(`author: ${extParagraphsContentArr[currentParagraphIndex].data.author}`);
          const profile = await getData(`/users/singleId/${extParagraphsContentArr[currentParagraphIndex].data.author}`);
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

  // useEffect(async() => {
  //   await getProfileImg();
  // }, [commentUid]);

  const handleNextParagraph = () => {
    setPageNumber(pageNumber + 2);
    setCurrentParagraphIndex((prevIndex) => prevIndex + 1);
    setShouldFetchData(true);
  };

  const handleSelectChange = (event) => {
    const selectedIndex = parseInt(event.target.value, 10);
    setCurrentParagraphIndex(selectedIndex);
  }

  const handlePrevParagraph = () => {
    setPageNumber(pageNumber - 2);
    setCurrentParagraphIndex((prevIndex) => prevIndex - 1);
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

  const getProfileImg = async () => {
    let data = '';
    try {
      console.log(commentUid);
      data = await getData(`/users/singleId/${commentUid}`);
      console.log("profile pic: ", data.profilePicture);
    } catch (error) {
      console.log("Error: ", error);
    }
    setProfileImg(data.profilePicture);
  }

  return (
    <div className="outer-main-book">
      <Navbar />
      <div className="inner-main-book p-5">
        <div className="select-paragraph mt-3 mb-3 pe-3">
          <label htmlFor="paragraphSelect">Select Paragraph:</label>
          <select id="paragraphSelect" className='select-input bg-dark text-white ms-2' onChange={handleSelectChange} value={currentParagraphIndex}>
            {extParagraphsContentArr.map((paragraph, index) => (
              <option key={index} value={index}>
                {paragraph.data.name}

              </option>
            ))}
          </select>
        </div>
        <div className="paragraphs d-flex">
          <div className="paragraph-content container p-2 bg-dark">
            <p className='title-p mb-3'>{selectedBook.title}</p>
            <p className='content p-3'>{firstColumn}</p>
            <p className='page-number-1 px-4 py-2'>{pageNumber}</p>
          </div>
          <div className="paragraph-content container p-2 bg-dark">
            <p className='title-p mb-3'>{selectedBook.title}</p>
            <p className='content p-3'>{secondColumn}</p>
            <p className='page-number-2 px-4 py-2'>{pageNumber + 1}</p>
          </div>
        </div>
        <br />
        <div className="buttons d-flex justify-content-between px-3 mb-4">
          <button className='btn text-white border' onClick={handlePrevParagraph}>Previous</button>
          <button className='btn text-white border' onClick={handleNextParagraph}>Next</button>
        </div>

        {profileData && (
          <div className='author-details'>
            <div className="top-details mb-5 row p-4 bg-dark">
              <div className="profile-img-div col-3">
                <img className='profile-img' src={profileData.profilePicture} alt="Profile" />
              </div>
              <div className="details-div col-8">
                <p><strong>Author:</strong> {profileData.username}</p>
                <p><strong>Bio:</strong> {profileData.bio} </p>
                <p><strong>Rating:</strong> {profileData.rating}</p>
              </div>
            </div>

            <div className="bottom-details mb-5">
              <h2 className='mb-4'>Comments:</h2>
              {commentData && commentData.map((comment) => (
                <div className="comment row mb-4" key={comment._id}>
                  {/* {setCommentUid(comment.userId)} */}
                  <img className='profile-img col-1 me-3' src={profileImg} alt="Profile" />
                  <div className="comment-inner col-10">
                    <div className="comment-inner-inner d-flex">
                      <p className='comment-uid fw-bold me-2'>@{comment.userId}</p>
                      <p className='comment-date'>{comment.dateCreated && comment.dateCreated.substring(0, 10)}</p>
                    </div>
                    <p className=''>{comment.content}</p>
                  </div>
                </div>
              ))}

              <form onSubmit={handleCommentSubmit}>
                <button className='btn border text-white mb-2 mt-2' onClick={() => { setAddComment(!addComment) }}>Add a Comment</button>
                {addComment && (
                  <div className="add-comment w-25 d-flex">
                    <input className="comment-input form-control me-2" ref={inputRef} type="text" id="comment" name="comment" />
                    <button className='btn text-white border' type="submit">Submit</button>
                  </div>)}
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Book;











