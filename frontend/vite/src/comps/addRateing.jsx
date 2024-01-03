import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { apiService } from '../service/apisService';
import StarRating from './starRating';

const AddRateing = () => {
    const location = useLocation();
    const { author: profileData } = location.state || {};
    const { postData } = apiService();

    const [rating, setRating] = useState(1);

    const handleRatingChange = (e) => {
        const newRating = parseInt(e.target.value, 10);
        setRating(newRating);
    };

    const handleSubmit = async () => {
        try {
            const res = await postData('/ratings', { author: profileData._id, rating: rating });
            console.log(res);

            // Handle success, e.g., show a success message to the user
        } catch (error) {
            console.error('Error while making API request:', error);
            // Handle error, e.g., show an error message to the user
        }
    };

    return (
        <div style={{ backgroundColor: 'black', color: 'white', padding: '20px', borderRadius: '10px' }}>
            <div className="profile-img-div col-3">
                <img className="profile-img" src={profileData.profilePicture} alt="Profile" />
            </div>
            <div>
                <h2>Come vote and impact! <br />Rate {profileData.username}</h2>
                <label htmlFor="rating">Rating:</label>
                <input className='btn text-white border' type="number" id="rating" min="1" max="5" value={rating} onChange={handleRatingChange} />
                <button className='btn text-white border' onClick={handleSubmit}>
                    Submit Rating
                </button>
            </div>
            <div>
                <StarRating averageRating={rating} />
            </div>
        </div>
    );
};

export default AddRateing;

