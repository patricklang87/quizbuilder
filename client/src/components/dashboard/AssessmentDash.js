import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function AssessmentDash() {
    return (
        <div className="dashboard">
            <Outlet />
        </div>
    )
}