import React, { useContext, useState } from 'react';
import { AppContext } from '../context/context';

const Book = () => {
  const { extParagraphsContentArr } = useContext(AppContext);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);

  const handleNextParagraph = () => {
    setCurrentParagraphIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getData('/users/single/:idUser');
        console.log('Data from API:', profile.data);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [setCurrentParagraphIndex]);

  return (
    <div className="container">
      <p>{extParagraphsContentArr[currentParagraphIndex]?.data.content}</p>
      <button onClick={handleNextParagraph}>Next Paragraph</button>
    </div>
  );
};

export default Book;






