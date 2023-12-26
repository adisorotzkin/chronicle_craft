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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<SignUp />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/explore" element={<Explore />} />
                <Route path='/search' element={<Search />} />
                <Route path='/newStory' element={<NewStory />} />
                <Route path='/notifications' element={<Notifications />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
