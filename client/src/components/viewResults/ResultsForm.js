import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ResultsPart from './ResultsPart';

export default function ResultsForm() {
    const navigate = useNavigate()
    const title = useSelector(state => state.takeQuiz.title);
    const course = useSelector(state => state.takeQuiz.course);
    const creator_first_name = useSelector(state => state.takeQuiz.creator_first_name);
    const creator_last_name = useSelector(state => state.takeQuiz.creator_last_name);
    const parts = useSelector(state => state.takeQuiz.parts);
    const result = useSelector(state => state.takeQuiz.result);
    const score = result.score;
    const taken_at = new Date(result.taken_at);
    const responses = result.responses;

    const partsList = [...parts].sort((a, b) => {
        return a.quiz_pos - b.quiz_pos;
    }).map(part => {
        return <ResultsPart part={part} />;
    });

    const handleClose = () => {
        navigate('/assessmentDash/assessmentsList')
    }

    return (
        <div className="container">
            <div className="container">
                <h1>{title}</h1>
                <p>Quiz by {creator_first_name} {creator_last_name} for {course}</p>
                <p>Results for submission on {new Date(taken_at).toLocaleString()}</p>
                <p>Score: <strong>{score}%</strong></p>
                <button className="btn btn-secondary" onClick={handleClose}>Close Results</button>
            </div>
            {partsList}
            <button className="btn btn-secondary" onClick={handleClose}>Close Results</button>
        </div>
    )
}
