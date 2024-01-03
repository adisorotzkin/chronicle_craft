import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { apiService } from '../service/apisService';
import StarRating from './starRating';
import '../comps_css/addRating.css';

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

        } catch (error) {
            console.error('Error while making API request:', error);
        }
    };

    return (
        <div className='mainRatings' >
            <div className="profile-img-div col-3">
                <img className="profile-img" src={profileData.profilePicture} alt="Profile" />
            </div>
            <div className='divider'></div>
            <div className='pt-5'>
                <h2 className='h2ating'>Come vote and impact! <br />Rate {profileData.username}</h2>
                <label className='labaelRating'>Rating:</label>
                <input className='btn btn-dark text-white border' type="number" id="rating" min="1" max="5" value={rating} onChange={handleRatingChange} />
                <button className='btn btn-dark text-white border btnRatings' onClick={handleSubmit}>
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

