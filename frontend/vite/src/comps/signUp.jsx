import React, { useState } from 'react'
import '../comps_css/signUp.css'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showLoading, setShowLoading] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedImage(file);
        }
    };

    const handleImageUpload = async () => {
        try {
            if (selectedImage) {
                const timestamp = new Date().getTime();
                const fileName = `cv_image_${timestamp}`;
                const storageRef = ref(storage, fileName);

                await uploadBytes(storageRef, selectedImage);
                imageUrl = await getDownloadURL(storageRef);

                console.log('Image uploaded:', imageUrl);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const onSub = async () => {
        setShowNext(false);
        setShowLoading(true);
        await handleImageUpload();
        navigate('/explore');
    }

    return (
        <main className='main'>
            <div className="logo-signup d-flex">
                <img src='../public/images/logo.jpg' alt='logo' className="logo" />
            </div>
            <form className='form'>
                <div className="form-group">
                    <label>Email *</label>
                    <input type="email" placeholder='Enter email' className='form-control' />
                </div>
                <div className="form-group">
                    <label>Username *</label>
                    <input type="text" placeholder='Enter a username' className='form-control' />
                </div>
                <div className="form-group">
                    <label>Password *</label>
                    <input type="password" placeholder='Enter a password' className='form-control' />
                </div>
                <div className="form-group">
                    <label>Confirm Password *</label>
                    <input type="password" placeholder='Confirm password' className='form-control' />
                </div>
                <div className="form-group">
                    <label>Date of birth</label>
                    <input type="date" placeholder='Enter your DOB' className='form-control' />
                </div>
                <div className="form-group">
                    <label>bio</label>
                    <input type="text" placeholder='Tell us about yourself' className='form-control' />
                </div>
                <div className="form-group">
                    <label className='form-label'>Profile picture</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} className='form-control' />
                </div>
            </form>

            <div className="bottom-line container-fluid row justify-content-between">
                <div className="required-fields col-2">
                    <p>* Required fields</p>
                </div>
                <div className="next-div col-1">
                    {showNext && <button className='btn next-btn' onClick={() => { onSub }}>Next</button>}
                    {showLoading && <div className='spinner-border' role='status'></div>}
                </div>
            </div>
        </main>
    )
}

export default SignUp