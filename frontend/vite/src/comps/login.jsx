import React, { useState, useRef, useContext } from 'react'
import '../comps_css/signupLogin.css'
import { useNavigate } from 'react-router-dom'
import { apiService } from '../service/apisService';
import { AppContext } from '../context/context';


const Login = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const { postData } = apiService();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const {getStartedEmail} = useContext(AppContext);

  const handleLogin = async() => {
    try {
      const body = {
        email: emailRef.current.value,
        password: passwordRef.current.value
      }
      const res = await postData('/users/login', body);
      console.log(res);
      localStorage.setItem('token', res.token);
      console.log(res.user);
      localStorage.setItem('uid', res.user._id);
      navigate('/home');
    } 
    catch (error) {
      console.error('Error logging in:', error);
    }
  }

  const handleForgotPassword = async() => {
    navigate('/forgotPassword');
  }

  const onSub = async () => {
    setShowNext(false);
    setShowLoading(true);
    handleLogin();
  }

  return (
    <main className='main-signup'>
      <div className="logo-signup d-flex">
        <img src='../public/images/logo.jpg' alt='logo' className="logo" />
      </div>

      <form className='form'>
        <div className="form-group">
          <label>Email *</label>
          <input type="email" placeholder='Enter email' className='form-control' ref={emailRef} defaultValue={getStartedEmail}/>
        </div>
        <div className="form-group">
          <label>Password *</label>
          <input type="password" placeholder='Enter password' className='form-control' ref={passwordRef} />
        </div>
        <div className="forgot-pass-div py-2">
          <p className='forgot-pass-btn' onClick={handleForgotPassword}>Forgot password?</p>
        </div>
      </form>

      <div className="bottom-line container-fluid row justify-content-between">
        <div className="required-fields col-2">
          <p>* Required fields</p>
        </div>
        <div className="next-div col-1">
          {showNext && <button className='btn next-btn' onClick={onSub}><i className="fa fa-arrow-right" aria-hidden="true"></i></button>}
          {showLoading && <div className='spinner-border loading' role='status'></div>}
        </div>
      </div>
    </main>
  )
}

export default Login