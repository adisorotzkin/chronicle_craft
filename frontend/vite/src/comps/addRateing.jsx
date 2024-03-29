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
            const res2 = await updateAuthenticatedData('/users', profileData._id, { rating: average }, localStorage.getItem('token'));
            console.log(res2);
            alert('thanks!');
            navigate('/bookItem');

        } catch (error) {
            console.error('Error while making API request:', error);
            alert('Error , please try again');
        }
    };

    return (
        <div className='outer-main-rating'>
            <div className="inner-main-rating container bg-dark">
                <h1 className='title-rating mb-5'>Vote and Impact!</h1>
                <div className="profile-data">
                    <div className="profile-img-div-rating">
                        <img className="profile-img-rating" src={profileData.profilePicture} alt="Profile" />
                    </div>
                    <div className='pt-5 rate-div'>
                        <h2> Rate {profileData.username}:</h2>
                        <StarRating averageRating={rating} />
                        <label className='labaelRating mb-2'>Rating:</label>
                        <input className='btn text-white border mb-3' type="number" id="rating" min="1" max="5" value={rating} onChange={handleRatingChange} />
                        <button className='btn text-white border btnRatings' onClick={handleSubmit}>
                            Submit Rating
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRating;

