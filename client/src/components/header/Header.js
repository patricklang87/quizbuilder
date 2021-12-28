import React from 'react';
import Nav from './Nav';
import MobileHeader from './MobileHeader';

const FullHeader = () => {
    return (
        <div className="header container-lo">
            <h1>Lecturna</h1>
            <Nav />    
        </div>
    )
}

export default function Header() {
    return (
        <div>
           <FullHeader/>
            <MobileHeader /> 
        </div>
        
    )
}
