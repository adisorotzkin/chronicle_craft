import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'
import Welcome from '../comps/welcome'

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className='main-navbar fixed-left vh-100'>
            {/* Logo */}
            <div className="logo">
                <img src='../public/images/logo.jpg' alt='logo' className="logo" onClick={() => { navigate(<Welcome />)}}/>
            </div>

            {/* Navigation Links */}
            <nav className='nav d-flex flex-column'>
                <div className="pt-4">
                    <i className="text-white fa fa-home" aria-hidden="true"></i>
                    <Link to="/" className='link'> Home</Link>
                </div>
                <div className="pt-4">
                    <i className="text-white fa fa-compass" aria-hidden="true"></i>
                    <Link to="/explore" className='link'> Explore</Link>
                </div>
                <div className="pt-4">
                    <i className="text-white fa fa-book" aria-hidden="true">
                    </i>
                    <Link to="/newStory" className='link'> New Story</Link>
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


            </nav>

            {/* User Actions */}
            <div className="flex-end">
                <button className="btn btn-dark exit">Exit</button>
            </div>
        </div>
    )
}

export default Navbar;





