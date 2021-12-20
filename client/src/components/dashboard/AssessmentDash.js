import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function AssessmentDash() {
    return (
        <div className="dashboard">
            <table>
                <tbody>
                    <tr>
                        <Link to="/assessmentDash/assessmentsList">View Results</Link>
                    </tr>
                    <tr>
                        <Link to="/assessmentDash/takeAssessment">Take Quiz</Link>
                    </tr>
                </tbody>
            </table>
            <Outlet />
        </div>
    )
}