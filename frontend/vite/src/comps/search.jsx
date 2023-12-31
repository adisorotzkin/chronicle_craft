import React, { useRef, useState } from 'react'
import Navbar from '../static_comps/navbar'
import '../comps_css/search.css'
import { apiService } from '../service/apisService';

const Search = () => {
  const searchRef = useRef();
  const { getData } = apiService();
  const [data, setData] = useState([]);

  const handleSearch = async () => {
    try {
      const result = await getData(`stories/search?s=${searchRef.current.value}`);
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
  }

  return (
    <div className='outer-main-search'>
      <Navbar />
      <div className='inner-main-search'>
        <form className="form-inline d-flex">
          <input className="form-control mr-sm-2" type="search" placeholder="Search by title or author" aria-label="Search" ref={searchRef} />
          <button className="btn my-2 my-sm-0" type="submit" onClick={handleSearch}><i className="text-white fa fa-search" aria-hidden="true"></i></button>
        </form>
        <div className="search-result">

        </div>
      </div>
    </div>
  )
}

export default Search