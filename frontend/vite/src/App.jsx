import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from './context/context';
import './App.css'
import Welcome from './comps/welcome'
import SignUp from './comps/signUp'
import Login from './comps/login'
import Explore from './comps/explore'
import Search from './comps/search'
import NewStory from './comps/newStory'
import Notifications from './comps/notifications'
import Profile from './comps/profile'
import ContactUs from './footer_comps/contactUs'
import Terms from './footer_comps/terms'
import PrivacyPolicy from './footer_comps/privacyPolicy'
import LegalNotices from './footer_comps/legalNotices';
import BookItem from './comps/bookItem';
import Home from './comps/home';

function App() {
    const [extParagraphsContentArr, setextParagraphsContentArr] = useState([]);
    const [paragraphsIdArr, setparagraphsIdArr] = useState([]);
    const [getStartedEmail, setgetStartedEmail] = useState('');
    const [indexRoute, setIndexRoute] = useState('');
    const [genresArray] = useState(['Comedy', 'ScienceFiction', 'Drama', 'Biography', 'Fantasy', 'Kids', 'Horror', 'Thriller', 'Mystery', 'Romance']);
  const [imageUrl, setImageUrl] = useState("/")

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIndexRoute(token ? <Home /> : <Welcome />);
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <AppContext.Provider value={{ extParagraphsContentArr, setextParagraphsContentArr, paragraphsIdArr, setparagraphsIdArr, getStartedEmail, setgetStartedEmail, genresArray,imageUrl,setImageUrl}}>
                    <Routes>
                        <Route index element={indexRoute} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                        <Route path='/bookItem' element={<BookItem />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path='/search' element={<Search />} />
                        <Route path='/newStory' element={<NewStory />} />
                        <Route path='/notifications' element={<Notifications />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/contactUs' element={<ContactUs />} />
                        <Route path='/terms' element={<Terms />} />
                        <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
                        <Route path='/legalNotices' element={<LegalNotices />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/welcome' element={<Welcome />} />
                    </Routes>
                </AppContext.Provider>
            </BrowserRouter>
        </div>
    )
}

export default App
