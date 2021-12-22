import React from 'react';
import CreateQuestion from '../createQuestion/CreateQuestion';
import ListQuestions from '../listQuestions/ListQuestions';
import { Outlet, Link } from 'react-router-dom';

export default function Dashboard() {
    return (
        <div className="dashboard">
            <Outlet />
        </div>
    )
}
