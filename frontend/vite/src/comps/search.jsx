import React, { useContext, useRef, useState } from 'react';
import Navbar from '../static_comps/navbar';
import '../comps_css/search.css';
import { apiService } from '../service/apisService';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/context';


const Search = () => {
  const searchRef = useRef();
  const navigate = useNavigate();
  const { getData } = apiService();
  const [data, setData] = useState([]);
  const { setSelectedBook } = useContext(AppContext);

  let searchContent = '';

  const handleBookClick = () => {
    navigate('/bookItem');
  };

  const handleSearch = async () => {
    try {
      const usernameResult = await getData(`/users/singleUsername/${searchRef.current.value}`);
      console.log("Username result:", usernameResult);
      if (usernameResult.data) {
        searchContent = usernameResult.data._id;
      } else {
        searchContent = searchRef.current.value;
      }

      const result = await getData(`/stories/search?s=${searchContent}`);
      console.log("Search result: ", result);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <div className='outer-main-search'>
      <Navbar />
      <div className='inner-main-search p-3'>
        <form className="form-inline d-flex" onSubmit={handleSubmit}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search by title or author"
            aria-label="Search"
            ref={searchRef}
          />
          <button className="btn my-2 my-sm-0" type="submit">
            <i className="text-white fa fa-search" aria-hidden="true"></i>
          </button>
        </form>
        <div className="search-result mt-4">
          {data.length === 0 ? (
            <p>No results found.</p>
          ) : (
            <div className='book-list row flex-wrap'>
              {data.map((item) => (
                <div key={item._id} className='book-item p-3 col-3' onClick={() => handleBookClick(item)}>
                  <img src={item.coverImg} alt={`Book Cover - ${item.title}`} className='book-cover' />
                  <p className='book-title mt-2'>{item.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;


