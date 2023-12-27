import React, { useEffect, useState, useContext } from 'react';
import { apiService } from '../service/apisService';
import Book from './book';
import Navbar from '../static_comps/navbar';
import { AppContext } from '../context/context';

const BookItem = () => {
  const { getData } = apiService();
  const { extParagraphsContentArr, setextParagraphsContentArr } = useContext(AppContext);

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

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [setextParagraphsContentArr]);

  return (
    <div>
      <Book />
    </div>
  );
};

export default BookItem;

