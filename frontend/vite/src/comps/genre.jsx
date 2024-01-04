import React, { useState, useEffect, useContext } from 'react'
import { apiService } from '../service/apisService';
import '../comps_css/genre.css'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context'

const Genre = (props) => {
    const { getData } = apiService();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [bookClicked, setBookClicked] = useState(false);
    const { selectedBook, setSelectedBook } = useContext(AppContext);

    const handleBookClick = (book) => {
        setSelectedBook(book);
        setBookClicked(!bookClicked);
    };

    const handleReadClicked = () => {
        navigate('/bookItem');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getData(`/stories/genre/${props.genre}`);
                if (result.data) {
                    setData(result.data);
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
                                    <p className='book-title mt-2'>{item.title}</p>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {bookClicked && (
                <div className="selected-book-info mb-5">
                    <h4>{selectedBook.title}</h4>
                    <p>{selectedBook.description}</p>
                    <button className='btn text-white border read-btn' onClick={() => { handleReadClicked() }}>Read</button>
                </div>
            )}
        </div>
    )
}

export default Genre


