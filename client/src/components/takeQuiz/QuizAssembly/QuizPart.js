import React from 'react';
import QuizQuestion from './QuizQuestion';

export default function QuizPart({part, addResponse}) {

    const questionsList = [...part.questions].sort((a, b) => {
        return a.part_pos - b.part_pos;
    }).map(question => {
        return <QuizQuestion question={question} addResponse={addResponse}/>;
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
