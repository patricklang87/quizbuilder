import React from 'react';
import { Link } from 'react-router-dom';

export default function StudentLinks() {
    return (
        <div className="dropdown"> 
            <button className="nav-link">Student</button>
            <div className="dropdown-content">
                <Link to="/assessmentDash/assessmentsList">View Results</Link>
                <Link to="/assessmentDash/takeAssessment">Take Quiz</Link>
            </div>
        </div>
    )
}
