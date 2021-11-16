import React, {useState} from 'react';
import axios from 'axios';

export default function Register() {
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
            const response = await axios.post('/api/auth', data);
            if (response.data.msg) {
                setInfo(response.data.msg);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }     
    }

    return (
        <div>
            <h1>Login</h1>
            {(info) && <p>{info}</p>}
            <form>
                <input
                    type="email"
                    name="email"
                    id="emailReg"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)} /><br />
                <label for="passwordReg">Password</label><br />
                <input
                    type="password"
                    name="password"
                    id="passwordReg"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)} /><br />
                
                <button onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}