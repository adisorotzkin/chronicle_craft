import React, { useState, useEffect } from 'react'
import { apiService } from '../service/apisService';
import '../comps_css/genre.css'

const Genre = (props) => {
    const { getData } = apiService();
    const [data, setData] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [bookClicked, setBookClicked] = useState(false);

    const handleBookClick = (book) => {
        // Set the selected book when a cover is clicked
        setSelectedBook(book);
        setBookClicked(!bookClicked);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getData(`/stories/genre/${props.genre}`);
                console.log('API Result:', result);

                if (result.data) {
                    setData(result.data);
                    console.log('Data Set:', result.data);
                } else {
                    console.log('No data received.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [props.genre]);

    return (
        <div className='outer-main-genre'>
            {data.length === 0 ? (
                ""
            ) : (
                <div className="genre-list">
                    <h1>{props.genre}</h1>
                    <div className="books-list">
                        {data.map((item) => (
                            <div key={item._id} className='book-item p-3' onClick={() => handleBookClick(item)}>
                                <img src={item.coverImg} alt={`Book Cover - ${item.title}`} className='book-cover' />
                                {/* Add any other book information you want to display */}
                                <p className='book-title'>{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Display additional information about the selected book */}
            {bookClicked && (
                <div className="selected-book-info p-3">
                    <h4>{selectedBook.title}</h4>
                    <p>{selectedBook.description}</p>
                    {/* Add more details as needed */}
                </div>
            )}
        </div>
    )
}

export default Genre