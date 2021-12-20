import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

export default function Auth() {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="auth">
            {showLogin ? <Login setShowLogin={setShowLogin} /> : <Register setShowLogin={setShowLogin}/>}
        </div>
    )
}
