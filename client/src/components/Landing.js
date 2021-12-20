import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import Auth from './auth/Auth';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) navigate("/dashboard");
    }, [isAuthenticated]);


    return (
        <div className="landing">
            <div className="hero">
                <div>
                    <h1>Teach your way.</h1>
                    <p>
                        With <strong>Lecturna</strong> you can collaborate to create your own assignments, quizzes, and texts. Sign up or sign in to get started!
                    </p>
                </div>
            </div>
            <Auth />
        </div>
    )
}
