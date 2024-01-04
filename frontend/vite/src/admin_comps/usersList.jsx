
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../static_comps/navbar';
import { apiService } from '../service/apisService';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';
import '../comps_css/reports.css';

const UsersList = () => {
    const tokenId = localStorage.getItem('token');
    const [usersList, setUsersList] = useState([]);
    const [apiRequestsCompleted, setApiRequestsCompleted] = useState(false);
    const { getAuthenticatedData,deleteAuthenticatedData } = apiService();
    const navigate = useNavigate();
    
    const fetchData = async () => {
        try {
            if (tokenId && !apiRequestsCompleted) {
                // Fetch reports
                const usersListResponse = await getAuthenticatedData('/users/usersList', tokenId);
                
                // // Create an array of promises for fetching additional data for each report
                // const additionalDataPromises = usersListResponse.map(async (item) => {
                //     const paragraphNameResponse = await getParagraph(item.paragraphId);
                //     console.log(paragraphNameResponse);
                //     const reporterNameResponse = await getUserName(item.reporterUserId);
                //     const authorNameResponse = await getUserName(paragraphNameResponse.author);
                    
                //     const book = await getData(`/stories/single/${paragraphNameResponse.storyId}`);

                //     // Update the item with additional data
                //     item.paragraphName = paragraphNameResponse.name || "";
                //     item.storyId = paragraphNameResponse.storyId || "";
                //     item.reporterName = reporterNameResponse || "";
                //     item.authorName = authorNameResponse || "";
                //     item.book = book.data || "";
                // });
                
                // // Wait for all additional data promises to complete
                // await Promise.all(additionalDataPromises);
                // console.log(additionalDataPromises);

                // Set the reports with additional data
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



    return (
        <div className='outer-main-reports'>
            < Navbar />
            <div className="inner-main-reports p-5">
                <div className="mb-4">
                    <h2>Your Users List</h2>

                    <div>
                        {usersList.length > 0 ? (
                            <div>
                                {usersList.map((item, index) => (
                                    <div className='border border-info text-end' key={index}>
                                        <h3>user name: {item.usernames}</h3>
                                        <h3>user email{item.email}</h3>
                                        <h6>date of bearth: {item.dateOfBirth}</h6>
                                        <h6>bio : {item.bio}</h6>
                                        <h6>role: {item.role}</h6>
                                        <button onClick={async () => {
                                           const res = await deleteAuthenticatedData(`/users/${item._id}`, tokenId);
                                            console.log(res);
                                        }} className='btn btn-danger'>delete user</button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-warning">No reports found to report to admin.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersList;