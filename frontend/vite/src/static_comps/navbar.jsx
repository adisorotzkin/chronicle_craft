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
                {/* <div className="pt-4">
                    <i className="text-white fa fa-compass" aria-hidden="true"></i>
                    <Link to="/explore" className='link'> Explore</Link>
                </div> */}
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
                <button className="btn btn-dark exit-btn" onClick={handleExit}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="30" height="30" viewBox="0 0 24 24" stroke-width="2.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                        <path d="M9 12h12l-3 -3" />
                        <path d="M18 15l3 -3" />
                    </svg>
                </button>
                {/* <i class="bi bi-box-arrow-right text-danger"></i> */}
            </div>
        </div>
    )
}

export default Navbar;





