import React from 'react'
import { useNavigate } from 'react-router-dom'
import './footer.css'

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer>
            <div className="container-fluid">
                <div className="row justify-content-around p-3 mt-3">
                    <div className="contact-btn col-3">
                        <button className='btn footer-btn border-none text-white' onClick={() => { navigate('/contact') }}>Have any questions? Contact us</button>
                    </div>
                    <div className="account-btn col-3">
                        <button className='btn footer-btn border-none text-white' onClick={() => { navigate('/login') }}>My account</button>
                    </div>
                    <div className="getStarted-btn col-3">
                        <button className='btn footer-btn border-none text-white' onClick={() => { navigate('/') }}>Start exploring</button>
                    </div>
                </div>
                <div className="row justify-content-around p-3">
                    <div className="privacy-btn col-3">
                        <button className='btn footer-btn border-none text-white' onClick={() => { navigate('/privacyPolicy') }}>Our privacy policy</button>
                    </div>
                    <div className="legal-btn col-3">
                        <button className='btn footer-btn border-none text-white' onClick={() => { navigate('/legalNotices') }}>Legal notices</button>
                    </div>
                    <div className="terms-btn col-3">
                        <button className='btn footer-btn border-none text-white' onClick={() => { navigate('/terms') }}>Terms of use</button>
                    </div>
                </div>
                <div className="row d-flex flex-end p-3 mt-3 ms-5 ps-4">
                <div className="copyright col-3">
                        <p>Copyright © Chronicle Craft 2023 </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer