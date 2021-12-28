import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout';
import { IoMenu } from 'react-icons/io5';
import { BsXLg } from 'react-icons/bs';

const LinkList = ({setShowingHeader}) => {
    const userName = useSelector(state => state.user.firstName);

    return (
        <div className="container link-menu">
            <div className="link-list">
                <h3>Student</h3>
                <Link onClick={() => setShowingHeader(false)} to="/assessmentDash/takeAssessment">Take Quiz</Link>
                <br />
                <Link onClick={() => setShowingHeader(false)} to="/assessmentDash/assessmentsList">View Results</Link>
                <br />
                
                <h3>Instructor</h3>
                <Link onClick={() => setShowingHeader(false)} to="/dashboard/createQuiz">Create Quiz</Link>
                <br />
                <Link onClick={() => setShowingHeader(false)} to="/dashboard/myQuizzes">My Quizzes</Link>
                <br />
                <h3>{userName}</h3>
                <Logout onClick={() => setShowingHeader(false)} />
            </div >
            <div style={{marginTop: '10px'}}>
                <BsXLg size="1.5em" onClick={() => setShowingHeader(false)} />
            </div>
            
        </div>
    );
}

const HamburgerIcon = ({setShowingHeader}) => {
    return (
        <div className="hamburger-icon">
            <IoMenu size="3em" onClick={() => {setShowingHeader(true)}} />
        </div>
    );
    
}

const Logo = () => {
    return (
        <div style={{borderBottom: '1px solid black', paddingLeft: '20px'}}>
            <h1>Lecturna</h1>
        </div>
    );
}



export default function MobileHeader() {
    const [showingHeader, setShowingHeader] = useState(false);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    return (
        <div className="mobileHeader">
            {!isAuthenticated && <Logo />}
            {!showingHeader && <HamburgerIcon setShowingHeader={setShowingHeader} />}
            {showingHeader && <LinkList setShowingHeader={setShowingHeader} />}
        </div>
    )
}
