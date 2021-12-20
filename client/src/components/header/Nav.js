import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout';

export default function Nav() {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    return (
        <table>
            <tbody>
                <tr>
                    {isAuthenticated && <td><Link to="/assessmentDash">Quizzes and Results</Link></td>}
                </tr>
                <tr>
                    {isAuthenticated && <td><Link to="/dashboard">Create/Edit Quizzes</Link></td>}
                </tr>
                <tr>
                    <td>{isAuthenticated ? <Logout /> : <Link to="/">Login</Link>}</td>
                </tr>
            </tbody>
        </table>
    )
}
