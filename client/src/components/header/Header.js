import React from 'react';
import {useSelector} from 'react-redux';
import Nav from './Nav';

export default function Header() {
    const firstName = useSelector(state => state.user.firstName);
    return (
        <div className="header container-lo">
            <h1>Lecturna</h1>
            {(firstName) && <p><i>Hello, {firstName}!</i></p>}
            <Nav />
            
        </div>
    )
}
