import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'
import Welcome from '../comps/welcome'
import { apiService } from '../service/apisService';
import Greeting from '../comps/greeting';
import Home from '../comps/home';


const Navbar = () => {
    const navigate = useNavigate();
    const { getData } = apiService();
    const uid = localStorage.getItem('uid');
    const [admin, setAdmim] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const user = await getData(`/users/singleId/${uid}`);            
                console.assert(user);
                if (user.data.role === 'admin') {
                    setAdmim(true);
                    // console.log('Data Set:', result.data);
                } else {
                    console.log('No you are not an admin.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [uid]);



    const reportsLink = admin ? (
        <>
            <div className="pt-4">
                <i className="text-white fa fa-envelope" aria-hidden="true"></i>
                <Link to="/reports" className='link'> Reports</Link>
            </div>
            <div className="pt-4">
                <i className="text-white fa fa-id-card" aria-hidden="true"></i>
                <Link to="/usersList" className='link'>Users List</Link>
            </div>
        </>
    ) : null;


    const handleExit = () => {
        localStorage.clear();
        navigate('/welcome');
    }

    return (
        <div className='main-navbar fixed-left vh-100'>
            {/* Logo */}
            <div className="logo">
                <img src='../images/logo.jpg' alt='logo' className="logo" onClick={() => { navigate('/home') }} />
            </div>

            {/* Navigation Links */}

            <nav className='nav d-flex flex-column'>
                <div className="pt-4">
                    <i className="text-white fa fa-home" aria-hidden="true"></i>
                    <Link to="/home" className='link'> Home</Link>
                </div>
                <div className="pt-4">
                    <i className="text-white fa fa-compass" aria-hidden="true"></i>
                    <Link to="/explore" className='link'> Explore</Link>
                </div>
                <div className="pt-4">
                    <i className="text-white fa fa-search" aria-hidden="true"></i>
                    <Link to="/search" className='link'> Search</Link>
                </div>
                <div className="pt-4">
                    <i className="text-white fa fa-link" aria-hidden="true"></i>
                    <Link to="/robbie" className='link'> Robbie</Link>
                </div>
                <div className="pt-4">
                    <i className="text-white fa fa-book" aria-hidden="true">
                    </i>
                    <Link to="/newStory" className='link'> Create</Link>
                </div>
                <div className="pt-4">
                    <i className="text-white fa fa-comment" aria-hidden="true">
                    </i>
                    <Link to="/notifications" className='link'> Notifications</Link>
                </div>
                <div className="pt-4">
                    <i className="text-white fa fa-user" aria-hidden="true">
                    </i>
                    <Link to="/profile" className='link'> Profile</Link>
                </div>
                {reportsLink}



            </nav>

            {/* User Actions */}
            <div className='exit-div'>
                <Greeting />
                {/* <button className="btn btn-dark exit-btn border" onClick={handleExit}>Log Out</button> */}
            </div>
        </div>
    )
}

export default Navbar;





