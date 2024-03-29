import React, { useRef, useState, useContext } from 'react'
import { AppContext } from '../context/context';
import '../comps_css/imageGenerator.css'

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const default_image = ""

const ImageGenerator = () => {

    let inputRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const { imageUrl, setImageUrl } = useContext(AppContext);
    



    const imageGeneratorFunc = async () => {
        if (inputRef.current.value === "") return 0;
        setLoading(true); // Set loading to true before making the API call
        const resp = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                    "User-Agent": "Chrome",
                },
                body: JSON.stringify({
                    prompt: `Create a picture for the cover of the book for me, this is its description:${inputRef.current.value} in oil paint style`,
                    n: 1,
                    size: "512x512"
                }),
            }
        );
        let data = await resp.json();
        console.log(data);
        setImageUrl(data.data[0].url);
        console.log("imageUrl from ai: ", imageUrl);
        setLoading(false); // Set loading to false after the API call is complete
    };

    return (
        <div className='ai-image-generator'>
            {/* <div className="header">Ai image <span>generator</span></div> */}
            <div className="img-loading">
                <div className="image"><img src={imageUrl === "/" ? default_image : imageUrl} className='cover-img'/></div>
                <div className="loading">
                    <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                    <div className={loading ? "loading-text" : "d-none"}>Loading....</div>
                </div>
            </div>
            <div className="search-box form-control bg-dark">
                <input type='text' ref={inputRef} className='search-input' placeholder='Enter description' />
                <div className="generate-btn" onClick={() => { imageGeneratorFunc() }}>generate image</div>
            </div>
        </div>
    )

}

export default ImageGenerator