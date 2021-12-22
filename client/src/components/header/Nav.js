import React from 'react';
import { useSelector } from 'react-redux';
import InstructorLinks from './InstructorLinks';
import StudentLinks from './StudentLinks';
import UserLinks from './UserLinks';

export default function Nav() {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    return (
        <table>
            <tbody>
                <tr>
                    {isAuthenticated && <InstructorLinks />}
                </tr>
                <tr>
                    {isAuthenticated && <StudentLinks />}
                </tr>
                <tr>
                    {isAuthenticated && <UserLinks />}
                </tr>
            </tbody>
        </table>
    )
}
