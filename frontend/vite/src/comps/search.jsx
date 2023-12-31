import React, {useRef, useState} from 'react'
import Navbar from '../static_comps/navbar'
import '../comps_css/search.css'
import { apiService } from '../service/apisService';

const Search = () => {
  const searchRef = useRef();
  const [data, setData] = useState([]);
  
  const handleSearch  = async() => {
    const result = await getData(`stories/search?${searchRef}`);
  }

  return (
    <div className='outer-main-search'>
      <Navbar />
      <div className='inner-main-search'>
        <form className="form-inline d-flex">
          <input className="form-control mr-sm-2" type="search" placeholder="Search by title or author" aria-label="Search" ref={searchRef}/>
          <button className="btn my-2 my-sm-0" type="submit" onClick={handleSearch}><i className="text-white fa fa-search" aria-hidden="true"></i></button>
        </form>
        <div className="search-result">

        </div>
      </div>
    </div>
  )
}

export default Search