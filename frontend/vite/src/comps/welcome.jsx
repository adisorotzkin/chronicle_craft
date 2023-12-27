import React, { useRef, useContext } from 'react'
import '../comps_css/welcome.css'
import { useNavigate } from 'react-router-dom'
import FAQs from '../comps/FAQs'
import Footer from '../footer_comps/footer'
import { AppContext } from '../context/context'

const Welcome = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const { setgetStartedEmail, getStartedEmail } = useContext(AppContext);

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
            <input className='form-control me-2' type="email" placeholder='Enter your email' ref={emailRef} />
            <button className='btn get-started-btn' onClick={() => {
              setgetStartedEmail(emailRef.current.value);
              console.log(emailRef.current.value);
              navigate('/signup');
            }}>Get started</button>
          </div>
        </div>
      </div>

      <div className="empty-area"></div>

      <div className="about-welcome">
        <div className="about-item-1 text-white">
          <div className="about-content">
            <h1>Your Passions, Our Platform</h1>
            <p>Embark on a journey where your creativity knows no bounds. Chronicle Craft is the canvas for your imagination, providing a stage for your stories to flourish.</p>
          </div>
          <div className="about-image">
            {/* <img src="path/to/image.jpg" alt="Illustration" /> */}
          </div>
        </div>

        <div className="about-item text-white">
          <div className="about-content">
            <h1>Unleash Your Writing Potential</h1>
            <p>Whether you're a seasoned writer or just starting, Chronicle Craft is your space to express, share, and collaborate. Dive into a community of storytellers and find inspiration at every turn.</p>
          </div>
          <div className="about-image">
            {/* <img src="path/to/image2.jpg" alt="Illustration" /> */}
          </div>
        </div>

        <div className="about-item text-white">
          <div className="about-content">
            <h1>Engage, Collaborate, Create</h1>
            <p>Connect with fellow writers, complete intriguing stories, and receive feedback from the community. Chronicle Craft is more than a platform; it's a vibrant community where creativity thrives.</p>
          </div>
            {/* <img src="path/to/image3.jpg" alt="Illustration" /> */}
          </div>
        </div>
      {/* <div className="faqs container-fluid">
        <FAQs />
      </div> */}
      <div className="footer">
        <Footer />
      </div>
    </div>
  )
}

export default Welcome