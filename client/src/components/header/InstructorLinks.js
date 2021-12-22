import React from 'react';
import { Link } from 'react-router-dom';

export default function InstructorLinks() {
    return (
        <div className="dropdown"> 
            <button className="nav-link">Instructor</button>
            <div className="dropdown-content">
                <Link to="/dashboard/myQuizzes">My Quizzes</Link>
                <Link to="/dashboard/createQuiz">Create Quiz</Link>
            </div>
        </div>
    )
}
