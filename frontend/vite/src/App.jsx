import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Welcome from './comps/welcome'
import SignUp from './comps/signUp'
import Login from './comps/login'
import Explore from './comps/explore'
import Search from './comps/search'
import NewStory from './comps/newStory'
import Notifications from './comps/notifications'
import Profile from './comps/profile'
import BookItem from './comps/bookItem';
import React, { useEffect, useState,useContext } from 'react';
import { AppContext } from './context/context';

function App() {
    
  const [extParagraphsContentArr,setextParagraphsContentArr] = useState([]);
    return (
        <div className="App">
            <BrowserRouter>
            <AppContext.Provider value = {{extParagraphsContentArr,setextParagraphsContentArr}}>
                <Routes>
                    <Route index element={<Welcome />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/bookItem' element={<BookItem />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/newStory' element={<NewStory />} />
                    <Route path='/notifications' element={<Notifications />} />
                    <Route path='/profile' element={<Profile />} />
                </Routes>
                </AppContext.Provider>
            </BrowserRouter>
        </div>
    )
}

export default App
