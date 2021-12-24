import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import Auth from './auth/Auth';
import { useNavigate } from 'react-router-dom';
import banner from '../assets/images/studying_hume.jpg';

export default function Landing() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) navigate("/dashboard/createQuiz");
    }, [isAuthenticated]);


    return (
        <div className="landing" style={{backgroundImage: `url(${banner})`, backgroundSize: "cover", height: '600px'}}>
            <div className="hero" >
              
                <div className="hero-text">
                    <h1>Teach your way.</h1>
                    <p>
                        With <strong>Lecturna</strong> you can collaborate to create your own assignments, quizzes, and texts. Sign up or sign in to get started!
                    </p>
                </div>

            </div>
            <Auth />
            <div className="photo-attribution">
                <p>Photo: <a href="https://unsplash.com/@christinhumephoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Christin Hume</a> on <a href="https://unsplash.com/collections/1016802/studying?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></p>
            </div>
            
        </div>
    )
}
