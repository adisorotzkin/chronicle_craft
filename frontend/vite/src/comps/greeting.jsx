import React, { useEffect, useState } from 'react'
import { apiService } from '../service/apisService';

const Greeting = () => {
    const uid = localStorage.getItem('uid');
    const [userData, setUserData] = useState('');
    const [apiRequestsCompleted, setApiRequestsCompleted] = useState(false);
    const { getData } = apiService();

    const fetchData = async () => {
        try {
            if (uid && !apiRequestsCompleted) {
                const userResponse = await getData(`/users/singleId/${uid}`);
                setUserData(userResponse.data);
                setApiRequestsCompleted(true);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [uid, apiRequestsCompleted]);

    const checkTime = () => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        let timeOfDay;

        if (currentHour >= 5 && currentHour < 12) {
            timeOfDay = 'morning';
        } else if (currentHour >= 12 && currentHour < 17) {
            timeOfDay = 'afternoon';
        } else if (currentHour >= 17 && currentHour < 20) {
            timeOfDay = 'evening';
        } else {
            timeOfDay = 'night';
        }
        return timeOfDay;
    }

    return (
        <div className='d-flex me-5'>
            {userData.profilePicture && (
                <div>
                    <img src={userData.profilePicture} className="profile-picture-greeting me-3" alt={`Profile ${userData.username}`} />
                </div>
            )}
            <div className="user-text-info text-white bold"><strong>
                Good {checkTime()} <br/> {userData.username} :)</strong>
            </div>
        </div>
    )
}

export default Greeting