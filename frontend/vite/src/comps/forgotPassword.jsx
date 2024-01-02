import React, { useState } from 'react';
import { apiService } from '../service/apisService';
import '../comps_css/signupLogin.css';

const ForgotPassword = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [ShowBtn, setShowBtn] = useState(true);
  const [email, setEmail] = useState('');
  const { postData } = apiService();

  const handleForgotPassword = async () => {
    setShowBtn(false);
    setShowLoading(true);
    try {
      await postData('/forgot-password', { email });
      alert('Password reset email sent. Check your inbox.');
    } catch (error) {
      console.error(error);
      alert('Failed to send reset email. Please try again.');
    }
    setShowBtn(true);
    setShowLoading(false);
  };

  return (
    <main className='main-signup'>
      <div className="logo-signup d-flex">
        <img src='../public/images/logo.jpg' alt='logo' className="logo" />
      </div>

      <form className='form text-white'>
        <h2>Forgot Password</h2>
        <div className="form-group">
          <input
            type="email"
            className='form-control'
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group d-flex justify-content-center mt-3">
          {ShowBtn && <button className='btn text-white border' onClick={handleForgotPassword}>Send Reset Email</button>}
          {showLoading && <div className='spinner-border loading' role='status'></div>}
        </div>
      </form>
    </main>
  );
};

export default ForgotPassword;
