// BookItem.jsx
import React, { useEffect, useContext } from 'react';
import { apiService } from '../service/apisService';
import Book from './book';
import { AppContext } from '../context/context';

const BookItem = () => {
  const { getData } = apiService();
  const { setextParagraphsContentArr,setparagraphsIdArr } = useContext(AppContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const story = await getData('/stories/single/6582be832ed143ffa5d0c223');
        console.log('Data from API:', story.data);

        let paragraphsIdArr = story.data.paragraphsArr || [];
        let paragraphsContentArr = [];
        for (let i = 0; i < paragraphsIdArr.length; i++) {
          paragraphsContentArr[i] = await getData(`/paragraphs/single/${paragraphsIdArr[i]}`);
          console.log(paragraphsContentArr[i]);
        }
        setextParagraphsContentArr(paragraphsContentArr);
        setparagraphsIdArr(paragraphsIdArr)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setextParagraphsContentArr,setparagraphsIdArr]);

  return (
    <div>
      <Book />
    </div>
  );
};

export default BookItem;


