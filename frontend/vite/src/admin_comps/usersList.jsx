
import React, { useEffect, useState } from 'react';
import Navbar from '../static_comps/navbar';
import { apiService } from '../service/apisService';

import '../comps_css/usersList.css';

const UsersList = () => {
    const tokenId = localStorage.getItem('token');
    const [usersList, setUsersList] = useState([]);
    const [apiRequestsCompleted, setApiRequestsCompleted] = useState(false);
    const { getAuthenticatedData, updateAuthenticatedData } = apiService();

    const fetchData = async () => {
        try {
            if (tokenId && !apiRequestsCompleted) {
                // Fetch reports
                const usersListResponse = await getAuthenticatedData('/users/usersList', tokenId);


                setUsersList(usersListResponse);

                console.log(usersListResponse);

                // Set apiRequestsCompleted to true
                setApiRequestsCompleted(true);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };




    useEffect(() => {
        fetchData();
    }, [tokenId, apiRequestsCompleted]);



    const deleteAccount = async (userData) => {

        const updatedUserInfo = {
            username: userData.username,
            email: userData.email,
            bio: userData?.bio,
            profilePicture: userData?.profilePicture,
            dateOfBirth: userData?.dateOfBirth,
            active: false
        };

        try {
            const updatedData = await updateAuthenticatedData('/users/', userData._id, updatedUserInfo, tokenId);
            console.log(updatedData);

            setUsersList(prevUsersList => prevUsersList.filter(user => user._id !== userData._id));

        } catch (error) {
            console.error('Error updating user data:', error);
            // Handle error as needed
        }
    }




    return (
        <div className='outer-main-reports'>
            <Navbar />
            <div className="inner-main-reports p-5">
                <div className="mb-4">
                    <h2 className="users-list-title display-1">Users List</h2>

                    <div className="users-list">
                        {usersList.length > 0 ? (
                            <div>
                                {usersList.map((item, index) => (
                                    <div className='user-info' key={index}>
                                        <div className="user-details">
                                            {item.profilePicture && (
                                                <div className="profile-picture me-3">
                                                    <img src={item.profilePicture} alt={`Profile ${item.username}`} />
                                                </div>
                                            )}
                                            <div className="user-text-info">

                                                <p className="user-name"><strong>User name: </strong> {item.username}</p>
                                                <p className="user-email"><strong>Email: </strong> {item.email}</p>
                                                <p className="date-of-birth"><strong>Date of birth: </strong>{new Date(item.dateOfBirth).toLocaleDateString()}</p>

                                                <p className="user-bio"><strong>bio:  </strong>{item.bio}</p>
                                                <p className="user-role"><strong>role: </strong> {item.role}</p>
                                                <p className='text-white'><strong>Active: {item.active? "true": "false"} </strong></p>

                                            </div>
                                        </div>
                                        <div className='text-end'>
                                            <button
                                                onClick={() => {
                                                    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
                                                    if (confirmDelete) {
                                                        deleteAccount(item);
                                                    }
                                                }}
                                                className='delete-user-btn'
                                            >
                                                delete user
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-warning no-reports-message">No users found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default UsersList;


//    const res = await deleteAuthenticatedData(`/users/${item._id}`, tokenId);
//     console.log(res);