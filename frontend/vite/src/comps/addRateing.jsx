import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { apiService } from '../service/apisService';
import StarRating from './starRating';
import '../comps_css/addRating.css';
import { useNavigate } from 'react-router-dom';

const AddRating = () => {
    const location = useLocation();
    const { author: profileData } = location.state || {};
    const { getData, postData, updateAuthenticatedData } = apiService();
    const navigate = useNavigate();

    const [rating, setRating] = useState(1);

    const handleRatingChange = (e) => {
        const newRating = parseInt(e.target.value, 10);
        setRating(newRating);
    };

    const handleSubmit = async () => {
        try {
            const res = await postData('/ratings', { author: profileData._id, rating: rating });
            console.log(res);
            const ratingResponse = await getData(`/ratings/${profileData._id}`);
            console.log('ratingsResponse: ', ratingResponse);
            const sum = ratingResponse.data.reduce((acc, rating) => acc + rating.rating, 0);
            const average = Math.floor(sum / ratingResponse.data.length);
            console.log(average);
            const res2 = await updateAuthenticatedData('/users', profileData._id, { rating:average }, localStorage.getItem('token'));
            console.log(res2);
            alert('thanks!');
            navigate('/bookItem');
            
        } catch (error) {
            console.error('Error while making API request:', error);
            alert('Error , please try again');
        }
    };

    return (
        <div className='mainRatings' >
            <div className="profile-img-div-rating col-3">
                <img className="profile-img-rating" src={profileData.profilePicture} alt="Profile" />
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

export default AddRating;

