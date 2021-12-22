import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout';

export default function StudentLinks() {
    const userName = useSelector(state => state.user.firstName);
    return (
        <div className="dropdown"> 
            <button className="nav-link">{userName}</button>
            <div className="dropdown-content">
                <Logout />
            </div>
        </div>
    )
}