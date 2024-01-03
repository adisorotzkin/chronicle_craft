import React, { useState, useRef, useContext } from 'react'
import '../comps_css/signupLogin.css'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/context'
import { apiService } from '../service/apisService'

const SignUp = () => {
    const { postData } = apiService();
    const [selectedImage, setSelectedImage] = useState(null);
    const [showLoading, setShowLoading] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [imageURL, setImageURL] = useState("");

    const { getStartedEmail } = useContext(AppContext);

    const navigate = useNavigate();
    const passwordRef = useRef(null);
    const usernameRef = useRef(null);
    const dobRef = useRef(null);
    const bioRef = useRef(null);

    const addNewDoc = async () => {
        try {
            const body = {
                email: getStartedEmail,
                password: passwordRef.current.value,
                profilePicture: selectedImage ? imageURL : "",
                bio: bioRef.current.value,
                dateOfBirth: dobRef.current.value,
                username: usernameRef.current.value
            }
            await postData('/users/signUp', body);

        } catch (error) {
            alert("We encountered an error while signing up. Please try again")
            setShowLoading(false);
            setShowNext(true);
            console.error('Error adding document:', error);
        }
    };

    const onSub = async () => {
        setShowNext(false);
        setShowLoading(true);
        // await handleImageUpload();
        await addNewDoc();
        navigate('/login');
    }

    return (
        <main className='main-signup'>
            <div className="logo-signup d-flex">
                <img src='../images/logo.jpg' alt='logo' className="logo" />
            </div>
            <form className='form'>
                <div className="form-group">
                    <label>Email *</label>
                    <input type="email" className='form-control' value={getStartedEmail} readOnly />
                </div>
                <div className="form-group">
                    <label>Username *</label>
                    <input type="text" placeholder='Enter a username' className='form-control' ref={usernameRef} />
                </div>
                <div className="form-group">
                    <label>Password *</label>
                    <input type="password" placeholder='Enter a password' className='form-control' ref={passwordRef} />
                </div>
                <div className="form-group">
                    <label>Confirm Password *</label>
                    <input type="password" placeholder='Confirm password' className='form-control' />
                </div>
                <div className="form-group">
                    <label>Date of birth</label>
                    <input type="date" placeholder='Enter your DOB' className='form-control' ref={dobRef} />
                </div>
                <div className="form-group">
                    <label>bio</label>
                    <input type="text" placeholder='Tell us about yourself' className='form-control' ref={bioRef} />
                </div>
                <div className="form-group">
                    <label className='form-label'>Profile picture</label>
                    <input type="file" accept="image/*" className='form-control' />
                </div>
            </form>

            <div className="bottom-line container-fluid row justify-content-between">
                <div className="required-fields col-2">
                    <p>* Required fields</p>
                </div>
                <div className="next-div col-1">
                    {showNext && <button className='btn next-btn' onClick={onSub}> <i className="fa fa-arrow-right" aria-hidden="true"></i></button>}
                    {showLoading && <div className='spinner-border' role='status'></div>}
                </div>
            </div>
        </main>
    )
}

export default SignUp