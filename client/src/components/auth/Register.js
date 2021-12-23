import React, {useState} from 'react';
import axios from 'axios';

export default function Register({ setShowLogin }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reenterPassword, setReenterPassword] = useState('');
    const [info, setInfo] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!firstName || !lastName) {
            setInfo("Please provide a first and last name.");
            return;
        }
        if (!email || !email.includes('@') || !email.includes('.')) {
            setInfo("Please provide a valid email address.");
            return;
        }
        if (!password || password.length < 8) {
            setInfo("Password must be at least 8 characters.");
            return;
        }
        if (password !== reenterPassword) {
            setInfo("Password entries must match.");
        }

        const data = {first_name: firstName, last_name: lastName, email, password};

        const response = await axios.post('/api/users', data);
        if (response.data.msg) {
            setInfo(response.data.msg);
        } else {
            //for testing
            console.log("heroku testing",response)
            setShowLogin(true);
        }
        
    }

    return (
        <div className="container">
            <h1>Register</h1>
            {(info) && <p>{info}</p>}
            <form>
                <label htmlFor="firstName">First Name</label><br />
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    onChange={e => setFirstName(e.target.value)} /><br />
                <label htmlFor="lastName">Last Name</label><br />
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    onChange={e => setLastName(e.target.value)} /><br />
                <label htmlFor="emailReg">Email</label><br />
                <input
                    type="email"
                    name="email"
                    id="emailReg"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)} /><br />
                <label htmlFor="passwordReg">Password</label><br />
                <input
                    type="password"
                    name="password"
                    id="passwordReg"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)} /><br />
                <label htmlFor="reenterPassword">Reenter Password</label><br />
                <input
                    type="password"
                    name="reenterPassword"
                    id="reenterPassword"
                    placeholder="Re-Enter Password"
                    onChange={e => setReenterPassword(e.target.value)} /><br />
                <button onClick={handleRegister} className="btn-primary">Register</button>
            </form>
            <p>Already registered? <span className="inline-link" onClick={() => {setShowLogin(true)}}>Log in!</span></p>
        </div>
    )
}
