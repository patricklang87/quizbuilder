import React from 'react';
import ResultsQuestion from './ResultsQuestion';

export default function ResultsPart({part}) {

    const questionsList = [...part.questions].sort((a, b) => {
        return a.part_pos - b.part_pos;
    }).map(question => {
        return <ResultsQuestion question={question} />;
    });

    return (
        <div className="takeQuizPart">
            <h2>Part {part.quiz_pos}) {part.title}</h2>
            <p>{part.instructions}</p>
            <div>
                {questionsList}
            </div>
        </div>
    )
}