import React from 'react';
import { useSelector } from 'react-redux';

export default function MCResult({question}) {
    const result = useSelector(state => state.takeQuiz.result)['responses'];
    const {mark, res, key} = result[question.id];

    return (
        <div className="container">
            <p><strong>{mark ? "Correct" : "Incorrect"}</strong></p>
            <p>Your Response: {res}</p>
            <p>Correct Response(s): {key.join(" | ")}</p>
        </div>
    )
}