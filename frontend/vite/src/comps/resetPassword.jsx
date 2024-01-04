import React, { useState, useEffect } from 'react';
import { apiService } from '../service/apisService';
import { useLocation, useNavigate } from 'react-router-dom';
import '../comps_css/signupLogin.css';

const ResetPassword = () => {
    const [showLoading, setShowLoading] = useState(false);
    const [ShowBtn, setShowBtn] = useState(true);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const { postData } = apiService();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const navigate = useNavigate();

    useEffect(() => {
        console.log(token); // Log the token to verify
    }, [token]);

    const handleResetPassword = async () => {
        setShowBtn(false);
        setShowLoading(true);
        try {
            if (newPassword != confirmNewPassword) {
                alert('Passwords do not match.');
                setShowBtn(true);
                setShowLoading(false);
            }
            else {
                await postData(`/reset-password/${token}`, {
                    newPassword,
                });
                alert('Password reset successful.');
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to reset password. Please try again.');
        }
    };

    return (
        <main className='main-signup'>
            <div className="logo-signup d-flex">
                <img src='../images/logo.jpg' alt='logo' className="logo" />
            </div>

            <form className='form text-white'>
                <h2>Reset Password</h2>
                <div className="form-group">
                    <input
                        type="password"
                        className='form-control mt-3'
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        className='form-control mt-2'
                        placeholder="Confirm new password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                </div>

                <div className="form-group mt-3 d-flex justify-content-center">
                    {ShowBtn && <button className='btn text-white border' onClick={handleResetPassword}>Reset Password</button>}
                    {showLoading && <div className='spinner-border loading' role='status'></div>}
                </div>
            </form>
        </main>
    );
};

export default ResetPassword;


