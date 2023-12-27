import React from 'react'
import Navbar from '../static_comps/navbar'
import '../comps_css/home.css'

const Home = () => {
    return (
        <div className='home-row row'>
            <div className='navbar col-2'>
                <Navbar />
            </div>
            <div className="main-home col-10">
                Hello
            </div>
        </div>
    )
}

export default Home