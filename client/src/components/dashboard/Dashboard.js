import React from 'react';
import CreateQuestion from '../createQuestion/CreateQuestion';
import ListQuestions from '../listQuestions/ListQuestions';
import { Outlet, Link } from 'react-router-dom';

export default function Dashboard() {
    return (
        <div className="dashboard">
            <table>
                <tbody>
                    <tr>
                        <Link to="/dashboard/myQuizzes">My Quizzes</Link>
                    </tr>
                    <tr>
                        <Link to="/dashboard/createQuiz">Create Quiz</Link>
                    </tr>
                </tbody>
            </table>
            <Outlet />
        </div>
    )
}
