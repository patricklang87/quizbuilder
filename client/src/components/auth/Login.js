import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../utils/auth';
import { setCurrentUser } from '../../redux/userRedux';

export default function Login({ setShowLogin }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [info, setInfo] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !email.includes('@') || !email.includes('.')) {
            setInfo("Please provide a valid email address.");
            return;
        }
        if (!password || password.length < 8) {
            setInfo("Password must be at least 8 characters.");
            return;
        }

        const data = {email, password};
        try {
            const response = await login(data);
            dispatch(setCurrentUser(response.data));
        } catch (error) {
            console.log(error);
            setInfo("Login Failed. Please check your email and password.")
        }     
    }

    return (
        <div className="container">
            <h1>Login</h1>
            {(info) && <p className='alert-text'>{info}</p>}
            <form>
                <label htmlFor="EmailLogin">Email</label><br />
                <input
                    type="email"
                    name="email"
                    id="emailLogin"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)} /><br />
                <label htmlFor="passwordLogin">Password</label><br />
                <input
                    type="password"
                    name="password"
                    id="passwordLogin"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)} /><br />
                
                <button onClick={handleLogin} className="btn-primary">Login</button>
            </form>
            <p>First time here? <span className="inline-link" onClick={() => {setShowLogin(false)}}>Sign up</span>!</p>
        </div>
    )
}