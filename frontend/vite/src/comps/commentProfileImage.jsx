import React, { useEffect, useState } from 'react';
import { apiService } from '../service/apisService';
import '../comps_css/commentProfileImage.css'; // Make sure to import your CSS file for styling

const CommentProfileImage = (props) => {
  const comment = props.comment;
  const { getData } = apiService();
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getData(`/users/singleId/${comment.userId}`);
      setUserDetails(user);
    };
    fetchData();
  }, [comment.userId, getData]);

  return (
    <div className="commnt-profile-image-container">
      <img className="comment-profile-img" src={`${userDetails?.data.profilePicture}`} alt={`Profile of ${comment.userId}`} />
    </div>
  );
};

export default CommentProfileImage;
