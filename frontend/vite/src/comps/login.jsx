import React, { useState, useRef } from 'react'
import '../comps_css/signupLogin.css'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [showNext, setShowNext] = useState(true);

  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);


  const onSub = async () => {
    setShowNext(false);
    setShowLoading(true);
    navigate('/explore');
  }

  return (
    <main className='main-signup'>
      <div className="logo-signup d-flex">
        <img src='../public/images/logo.jpg' alt='logo' className="logo" />
      </div>

      <form className='form'>
        <div className="form-group">
          <label>Email *</label>
          <input type="email" placeholder='Enter email' className='form-control' ref={emailRef} />
        </div>
        <div className="form-group">
          <label>Password *</label>
          <input type="password" placeholder='Enter a password' className='form-control' ref={passwordRef} />
        </div>
      </form>

      <div className="bottom-line container-fluid row justify-content-between">
        <div className="required-fields col-2">
          <p>* Required fields</p>
        </div>
        <div className="next-div col-1">
          {showNext && <button className='btn next-btn' onClick={onSub}><i className="fa fa-arrow-right" aria-hidden="true"></i></button>}
          {showLoading && <div className='spinner-border' role='status'></div>}
        </div>
      </div>
    </main>
  )
}

export default Login