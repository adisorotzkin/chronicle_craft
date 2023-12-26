import React from 'react';
import '../comps_css/book.css';

const Book = (props) => {
  const { paragraphContent } = props;

  

  return (
    <div className="book-container">
      <p>{paragraphContent.content}</p>
    </div>
  );
};

export default Book;





