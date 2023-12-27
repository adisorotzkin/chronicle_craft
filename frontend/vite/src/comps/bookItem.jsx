// import React, { useEffect, useState } from 'react';
// import { apiService } from '../service/apisService';
// import Book from './book';
// import Navbar from '../static_comps/navbar'


// const BookItem = () => {
//   let paragraphNumber = 0;
//   let paragraphsArr = []
//   const { getData } = apiService();
//   const [paragraphContent, setParagraphContent] = useState({
//     _id: "",
//     storyId: "",
//     author: "",
//     content: "",
//     dateCreated: "",
//     end: ""
//   });
//   const nextparagraph = () => {
//     if (paragraphNumber < paragraphsArr.length) {
//       paragraphNumber++;
//     }
//   }
//   let paragraphId = '';
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const story = await getData('/stories/single/6582be832ed143ffa5d0c223');
//         console.log('Data from API:', story.data);

//         paragraphsArr = story.data.paragraphsArr || [];
//         if (paragraphsArr.length > 0) {
//           paragraphId = paragraphsArr[paragraphNumber];

//         }
//         const paragraphContentResponse = await getData(`/paragraphs/single/${paragraphId}`);
//         console.log('Data from API:', paragraphContentResponse.data);
//         setParagraphContent(paragraphContentResponse.data);

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [paragraphNumber]);
//   console.log(paragraphContent);

//   return (
//     <div>
//       <Book paragraphContent={paragraphContent} />
//       <button onClick={nextparagraph}>next paragraph</button>

//     </div>

//   );
// };

// export default BookItem;


import React, { useEffect, useState } from 'react';
import { apiService } from '../service/apisService';
import Book from './book';
import Navbar from '../static_comps/navbar';

const BookItem = () => {
  const { getData } = apiService();
  const [paragraphNumber, setParagraphNumber] = useState(0);
  const [paragraphContent, setParagraphContent] = useState({
    _id: "",
    storyId: "",
    author: "",
    content: "",
    dateCreated: "",
    end: ""
  });

  let paragraphsArr = [];

  const nextParagraph = () => {
    console.log(paragraphNumber);

    if (paragraphNumber < paragraphsArr.length ) {
      setParagraphNumber(paragraphNumber + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const story = await getData('/stories/single/6582be832ed143ffa5d0c223');
        console.log('Data from API:', story.data);

        paragraphsArr = story.data.paragraphsArr || [];
        if (paragraphsArr.length > 0) {
          const paragraphId = paragraphsArr[paragraphNumber];

          const paragraphContentResponse = await getData(`/paragraphs/single/${paragraphId}`);
          console.log('Data from API:', paragraphContentResponse.data);
          setParagraphContent(paragraphContentResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [ paragraphNumber]);

  console.log(paragraphContent);

  return (
    <div>
      <Book paragraphContent={paragraphContent} />
      <button onClick={nextParagraph}>next paragraph</button>
    </div>
  );
};

export default BookItem;
