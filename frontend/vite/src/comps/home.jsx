import React, {useContext, useState} from 'react'
import Navbar from '../static_comps/navbar'
import '../comps_css/home.css'
import { AppContext } from '../context/context'
import Genre from './genre'

const Home = () => {
    const {genresArray} = useContext(AppContext);
    

    return (
        <div className="outer-main-home">
            <Navbar />
            <div className="inner-main-home p-5">
                {genresArray.map((item) => (
                    <Genre key={item} genre={item} />
                ))}
            </div>
        </div>
    )
}

export default Home