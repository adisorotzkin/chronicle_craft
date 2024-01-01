import React from 'react';
import '../comps_css/StarRating.css'; 

const StarRating = ({ averageRating }) => {
  const roundedRating = Math.round(averageRating);

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: 'default',
            fontSize: '2em',
            color: star <= roundedRating ? 'gold' : 'gray',
          }}
        >
          &#9733;
        </span>
      ))}
      {/* <p className='p-1'>Rating: {roundedRating}</p> */}
    </div>
  );
};

export default StarRating;



// import React, { useState } from 'react';
// import '../comps_css/starRating.css'; 

// const StarRating = ({ averageRating, readOnly }) => {
//   const [rating, setRating] = useState(averageRating || 0);
//   const [hoveredRating, setHoveredRating] = useState(0);

//   const handleRatingClick = (selectedRating) => {
//     if (!readOnly) {
//       setRating(selectedRating);
//     }
//   };

//   const handleRatingHover = (hoveredRating) => {
//     if (!readOnly) {
//       setHoveredRating(hoveredRating);
//     }
//   };

//   return (
//     <div>
//       {[1, 2, 3, 4, 5].map((star) => (
//         <span
//           key={star}
//           onClick={() => handleRatingClick(star)}
//           onMouseEnter={() => handleRatingHover(star)}
//           onMouseLeave={() => handleRatingHover(0)}
//           style={{
//             cursor: readOnly ? 'default' : 'pointer',
//             fontSize: '2em',
//             color: (hoveredRating || rating) >= star ? 'gold' : 'gray',
//           }}
//         >
//           &#9733;
//         </span>
//       ))}
//       {!readOnly && <p>Selected Rating: {rating}</p>}
//     </div>
//   );
// };

// export default StarRating;



