import React from 'react'
import '../comps_css/welcome.css'
import { useNavigate } from 'react-router-dom'
import FAQs from '../comps/FAQs'

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <div className='main-welcome'>
        <div className="top container-fluid row justify-content-between">
          <div className="logo-welcome d-flex col-4">
            <img src='../public/images/logo.jpg' alt='logo' className="logo" />
          </div>
          <div className="login-btn col-1">
            <button className='btn btn-login' onClick={() => { navigate('/login'); }}>Log in</button>
          </div>
        </div>
        <div className="middle-welcome">
          <div className="title-welcome text-center text-white">
            <h1 className='fw-bolder'>Unlimited stories, by you.</h1>
            <h2>Write and share you imagination</h2>
            <h4>Ready to read and write? Enter your email to begin</h4>
          </div>
          <div className="get-started mt-4">
            <input className='form-control me-2' type="email" placeholder='Enter your email' />
            <button className='btn get-started-btn' onClick={() => {navigate('/signup')}}>Get started</button>
          </div>
        </div>
      </div>

      <div className="empty-area"></div>

      <div className="about-welcome">
        <div className="about-item-1 text-white">
              <h1>Your passions, Our platform</h1>
        </div>
        <div className="about-item text-white">
              <h1>Your passions, Our platform</h1>
        </div>
        <div className="about-item text-white">
              <h1>Your passions, Our platform</h1>
        </div>
      </div>
      <div className="faqs container-fluid">
        <FAQs />
      </div>
      {/* <div className="footer">
        <Footer />
      </div> */}
    </div>
  )
}

export default Welcome