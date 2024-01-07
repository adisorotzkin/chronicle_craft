
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../static_comps/navbar';
import { apiService } from '../service/apisService';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';
import '../comps_css/reports.css';

const Reports = () => {
    const tokenId = localStorage.getItem('token');
    const [reports, setReports] = useState([]);
    const [apiRequestsCompleted, setApiRequestsCompleted] = useState(false);
    const { getAuthenticatedData, getData } = apiService();
    const navigate = useNavigate();
    const { setSelectedBook, selectedBook } = useContext(AppContext);
    
    const fetchData = async () => {
        try {
            if (tokenId && !apiRequestsCompleted) {
                const reportsResponse = await getAuthenticatedData('/reports', tokenId);
                
                const additionalDataPromises = reportsResponse.map(async (item) => {
                    const paragraphNameResponse = await getParagraph(item.paragraphId);
                    console.log(paragraphNameResponse);
                    const reporterNameResponse = await getUserName(item.reporterUserId);
                    const authorNameResponse = await getUserName(paragraphNameResponse.author);
                    
                    const book = await getData(`/stories/single/${paragraphNameResponse.storyId}`);

                    item.paragraphName = paragraphNameResponse.name || "";
                    item.storyId = paragraphNameResponse.storyId || "";
                    item.reporterName = reporterNameResponse || "";
                    item.authorName = authorNameResponse || "";
                    item.book = book.data || "";
                });
                
                // Wait for all additional data promises to complete
                await Promise.all(additionalDataPromises);
                console.log(additionalDataPromises);

                // Set the reports with additional data
                setReports(reportsResponse);

                console.log(reportsResponse);

                // Set apiRequestsCompleted to true
                setApiRequestsCompleted(true);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const getParagraph = async (paragraphId) => {
        try {
            const paragraphNameResponse = await getData(`/paragraphs/single/${paragraphId}`);
            console.log(paragraphNameResponse);
            return paragraphNameResponse.data;
        } catch (error) {
            console.error('Error fetching paragraph name:', error);
            return "";
        }
    };


    const getUserName = async (userId) => {
        try {
            const reporterNameResponse = await getData(`/users/singleId/${userId}`);
            // console.log(reporterNameResponse);
            return reporterNameResponse.data.username;
        } catch (error) {
            console.error('Error fetching reporter name:', error);
            return "";
        }
    };



    useEffect(() => {
        fetchData();
    }, [tokenId, apiRequestsCompleted]);



    return (
        <div className='outer-main-reports'>
          <Navbar />
          <div className="inner-main-reports p-5">
            <div className="mb-4">
              <h2 className="reports-title">Your Reports</h2>
              <div className="reports-list">
                {reports.length > 0 ? (
                  <div>
                    {reports.map((item, index) => (
                      <div className='report-info' key={index}>
                        <h4 className="report-content"><strong>Report content: </strong>{item.reportReason}</h4>
                        <h5 className="reported-paragraph"><strong>Reported paragraph: </strong>{item.paragraphName}</h5>
                        <p className="reporter-name"><strong>Reporter name: </strong>{item.reporterName}</p>
                        <p className="author-name"><strong>Author name: </strong>{item.authorName}</p>
                        <button
                          onClick={() => {
                            setSelectedBook(item.book);
                            navigate('/bookItem');
                          }}
                          className='see-paragraph-btn'
                        >
                          See paragraph
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-warning no-reports-message">No reports found to report to admin.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
      
};

export default Reports;